<?php

namespace App\Controller\Admin;

use App\Entity\Customer;
use App\Entity\Bookings;
use App\Entity\CategoriesCottage;
use App\Entity\Configuration;
use App\Entity\Covers;
use App\Entity\LocationTypes;
use App\Entity\Periods;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractDashboardController
{
    #[Route('/admin')]
    public function index(): Response
    {
        return $this->redirectToRoute('app_home', [], Response::HTTP_MOVED_PERMANENTLY);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Cabane et gîte au naturel');
    }

    public function configureMenuItems(): iterable
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();

        $encodedRole = $request->query->get('rules');
        $tokenRequest = $request->query->get('token');
        $action = $request->query->get('crudAction');

        if ($action === 'index') {
            $this->checkPermissions();
        } else if ($action === 'edit' || $action === 'new') {
            $cookieToken = $request->cookies->get('jaat');
            $referrer = $request->query->get('referrer');

            if ($referrer !== null) {
                $token = base64_decode($this->extractTokenFromReferrer($referrer));
                if ($cookieToken !== $token) {
                    echo "Token invalide, vous n'avez pas les autorisations nécessaires.";
                    die;
                }
            } else if ($referrer === null) {
                echo "Token invalide, vous n'avez pas les autorisations nécessaires.";
                die;
            }
        }

        yield MenuItem::section('Donnés clients');
        yield from $this->yieldMenuItem('Clients', 'fas fa-list', Customer::class, $encodedRole, $tokenRequest);

        yield MenuItem::section('Réservations');
        yield from $this->yieldMenuItem('Réservations', 'fas fa-list', Bookings::class, $encodedRole, $tokenRequest);

        yield MenuItem::section('Paramétrages des locations');
        yield from $this->yieldMenuItem('Gites et cabanes', 'fas fa-list', CategoriesCottage::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Locations', 'fas fa-list', LocationTypes::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Périodes de disponibilité', 'fas fa-list', Periods::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Images', 'fas fa-list', Covers::class, $encodedRole, $tokenRequest);

        yield MenuItem::section('Paramétrage du site');
        yield from $this->yieldMenuItem('Paramétres', 'fas fa-list', Configuration::class, $encodedRole, $tokenRequest);
    }

    private function yieldMenuItem(string $label, string $icon, $entityClass, $encodedRole, $tokenRequest): iterable
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $menu = MenuItem::linkToCrud($label, $icon, $entityClass)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);

        if ($request->query->get('crudAction') === 'edit' || $request->query->get('crudAction')  === 'new') {
            $session = $request->getSession();
            $menu = $menu->setAction('index')->setQueryParameter('rules', base64_encode($session->get('user_role')))->setQueryParameter('token', base64_encode($session->get('jwt_token')));
        }
        yield $menu;
    }

    public function checkPermissions(): void
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $session = $request->getSession();

        $encodedRole = $request->query->get('rules');
        $tokenRequest = $request->query->get('token');

        $cookieToken = $request->cookies->get('jaat');

        $decodedRole = base64_decode($encodedRole);
        $decodedToken = base64_decode($tokenRequest);

        $session->set('user_role', $decodedRole);
        $session->set('jwt_token', $decodedToken);

        if ($session->get('user_role') !== 'ROLE_SUPER_ADMIN' || $cookieToken !== $session->get('jwt_token')) {
            echo "Token invalide, vous n'avez pas les autorisations nécessaire.";
            die;
        }
    }

    private function extractTokenFromReferrer(string $referrer): string
    {
        $parsedUrl = parse_url($referrer);
        parse_str($parsedUrl['query'], $queryParameters);

        if (isset($queryParameters['token'])) {
            return $queryParameters['token'];
        }

        echo "Token invalide, vous n'avez pas les autorisations nécessaire.";
        die;
    }
}

<?php

namespace App\Controller;

use DateTime;
use App\Repository\LocationTypesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(SessionInterface $session): Response
    {
        $clean = $session->get('clean');

        if ($clean) {
            $session->remove('clean');
            return $this->render('base.html.twig', [
                'clean' => true
            ]);
        } else {
            return $this->render('base.html.twig', [
                'clean' => false
            ]);
        }
    }

    #[Route(
        '/location/search',
        name: 'app_home_search',
        methods: ['GET', 'POST']
    )]
    public function searchBar(Request $request, LocationTypesRepository $localRepo)
    {
        $datas = json_decode($request->getContent(), true);

        $queryAccomodation = (int) $datas["accommodation"];
        $queryBegin = new DateTime($datas["begin"]);
        $queryEnd = new DateTime($datas["end"]);
        $queryCapacity = (int) $datas["capacity"];
        $querySanitary = $datas["hasSanitary"] === "false" ? false : true;
        $queryPool = $datas["hasPool"] === "false" ? false : true;
        $queryAnimal = $datas["animalAccepted"] === "false" ? false : true;
        $queryGarden = $datas["hasGarden"] === "false" ? false : true;

        $localRepo->searchLocations(
            $queryAccomodation,
            $queryBegin,
            $queryEnd,
            $queryCapacity,
            $querySanitary,
            $queryPool,
            $queryAnimal,
            $queryGarden
        );
    }
}

<?php

namespace App\Controller;

use DateTime;
use DateTimeImmutable;

use Stripe\Stripe;
use App\Entity\Bookings;
use Stripe\Checkout\Session;

use App\Repository\ConfigurationRepository;
use App\Repository\CustomerRepository;
use App\Repository\BookingsRepository;
use App\Repository\LocationTypesRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;


class StripeController extends AbstractController
{
    #[Route('/api/v1/stripe/checkout/{uid}', name: 'app_checkout', methods: ['POST', 'GET'])]
    public function checkout(string $uid, CustomerRepository $customerRepository, Request $request, ConfigurationRepository $configRepo)
    {
        $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

        if (!$maintenance->isValue()) {
            $user = $this->getUser();
            $customer = $customerRepository->findOneByUid($uid);

            if ($user !== null && $user === $customer) {
                $data = json_decode($request->getContent(), true);

                $location = $data['location'][0];
                $price = (int)$data['price'];
                $dates = json_decode($data['dates']);
                $images = $location['cottage']['covers'];

                $dateStart = date_create($dates[0]);
                $dateEnd = date_create($dates[1]);

                $selectedPath = '';
                foreach ($images as $image) {
                    if (isset($image['priority']) && $image['priority'] == 1) {
                        $selectedPath = $image['path'];
                        break;
                    }
                }

                $protocol = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] . '://' : 'http://';

                $host = $_SERVER['HTTP_HOST'];
                $baseURL = $protocol . $host;

                $cover =  $baseURL . '/uploads/images/' . $selectedPath;

                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'eur',
                        'unit_amount' => $price,
                        'product_data' => [
                            'name' => 'Location : ' . $location['cottage']['name'],
                            'description' => 'Du ' . date_format($dateStart, 'd/m/Y') . ' au ' .  date_format($dateEnd, 'd/m/Y'),
                            'images' => [$cover],
                        ],
                    ],
                    'quantity' => 1,
                ];

                $bookingData['location'] =
                    [
                        'id_location' => $location['id'],
                        'qty_traveller' => $data['location'][1]['qtyTraveller'],
                        'price' => $price,
                        'start_at' => new DateTime($dates[0]),
                        'end_at' => new DateTime($dates[1]),
                    ];

                $bookingDataJson = json_encode($bookingData);

                $tokenProvider = $this->container->get('security.csrf.token_manager');
                $token = $tokenProvider->getToken('stripe_token')->getValue();

                Stripe::setApiKey("sk_test_51LNAhmC17yFFjZeKpt9iZzF7X3zyh8b1nCC8HOnuVDCFL5Fxd08YvUmmw8gOFNaRr6a5LbussyOpWa5o7AFASDst00Mocj7bKg");

                $protocol = isset($_SERVER['REQUEST_SCHEME']) ? $_SERVER['REQUEST_SCHEME'] . '://' : 'http://';

                $host = $_SERVER['HTTP_HOST'];
                $baseURL = $protocol . $host;

                $stripeSession = Session::create([
                    'line_items' => $lineItems,
                    'mode' => 'payment',
                    'success_url' => $baseURL . '/checkout_success/' . $token . '/' . $uid . '?bookingData=' . urlencode($bookingDataJson),
                    'cancel_url' => $baseURL . '/checkout_error',
                ]);


                return new JsonResponse($stripeSession->url);
            } else {
                throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
            }
        } else {
            return $this->render('maintenance.html.twig');
        }
    }

    #[Route('checkout_success/{token}/{uid}', name: 'app_checkout_success', methods: ['GET'])]
    public function checkoutSuccess(
        string $token,
        string $uid,
        Request $request,
        BookingsRepository $bookRepo,
        LocationTypesRepository $locationRepo,
        CustomerRepository $customerRepository,
        SessionInterface $session,
        ConfigurationRepository $configRepo,
        MailerInterface $mailer,
    ): Response {
        $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

        if (!$maintenance->isValue()) {
            $bookingDataJson = $request->query->get('bookingData');
            $bookingData = json_decode(urldecode($bookingDataJson), true)['location'];
            $customer = $customerRepository->findOneByUid($uid);

            $location = $locationRepo->findOneBy(['id' => $bookingData['id_location']]);

            $booking = new Bookings();
            $booking
                ->setLocationType($location)
                ->setCustomer($customer)
                ->setCreatedAt(new DateTimeImmutable())
                ->setQuantityTraveller($bookingData['qty_traveller'])
                ->setTotalPrice($bookingData['price'])
                ->setStartAt(new DateTime($bookingData['start_at']['date']))
                ->setEndAt(new DateTime($bookingData['end_at']['date']));

            $bookRepo->save($booking, true);

            setlocale(LC_TIME, 'fr_FR.utf8');

            // Votre logique de contrôleur ici

            // Formater la date avec la locale française
            $startDate = strftime('%d %B %Y', $booking->getStartAt()->getTimestamp());


            $email = (new TemplatedEmail())
                ->from('Cabane et gite au naturel <contact@cabaneetgiteaunaturel.com>')
                ->to($customer->getEmail())
                ->subject("Création de votre compte utilisateur")
                ->htmlTemplate('/mail/confirmation_booking.html.twig')
                ->context([
                    'firstname' => $customer->getFirstname(),
                    'date_start' =>  $startDate,
                ]);

            $mailer->send($email);


            if ($this->isCsrfTokenValid('stripe_token', $token)) {
                $session->set('token', $token);
                return $this->redirectToRoute('app_home');
            }

            $session->set('token', $token);
            return $this->redirectToRoute('app_home');
        } else {
            return $this->render('maintenance.html.twig');
        }
    }


    #[Route('checkout_error', name: 'app_checkout_error', methods: ['GET'])]
    public function checkoutError(SessionInterface $session, ConfigurationRepository $configRepo): Response
    {
        $maintenance = $configRepo->findOneBy(['name' => 'Maintenance']);

        if (!$maintenance->isValue()) {
            $session->set('token', false);

            return $this->redirectToRoute('app_home');
        } else {
            return $this->render('maintenance.html.twig');
        }
    }
}

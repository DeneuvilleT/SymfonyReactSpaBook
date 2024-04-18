<?php

namespace App\Controller;

use DateTime;
use App\Repository\LocationTypesRepository;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ReactController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(SessionInterface $session): Response
    {
        $tokenAfterBuy = $session->get('token');

        if ($tokenAfterBuy) {

            $session->remove('token');

            $response = $this->render('base.html.twig', [
                'back' => $tokenAfterBuy
            ]);

            $response->headers->set('Set-Cookie', 'tokenAfterBuy=' . $tokenAfterBuy . '; path=/; expires=' . (new \DateTime('+10 minutes'))->format('r') . '; SameSite=None; Secure');

            return $response;
        } else if ($tokenAfterBuy === false) {
            return $this->render('base.html.twig', [
                'back' => 'error_buy'
            ]);
        } else if ($tokenAfterBuy === null) {
            return $this->render('base.html.twig', [
                'back' => false
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
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $datas = json_decode($request->getContent(), true);
        $queryType = $datas["cottage"] !== 'null' ? boolval($datas["cottage"]) : null;
        $queryBegin = new DateTime($datas["begin"]);
        $queryEnd = new DateTime($datas["end"]);
        $queryCapacity = (int) $datas["capacity"];
        $querySanitary =  boolval($datas["hasSanitary"]);
        $queryPool =  boolval($datas["hasPool"]);
        $queryAnimal =  boolval($datas["animalAccepted"]);
        $queryGarden =  boolval($datas["hasGarden"]);

        $locations = $localRepo->searchLocations(
            $queryType,
            $queryBegin,
            $queryEnd,
            $queryCapacity,
            $querySanitary,
            $queryPool,
            $queryAnimal,
            $queryGarden
        );

        $data = [];

        /** @var \App\Entity\LocationTypes $location */
        foreach ($locations as $location) {
            $locationData = [
                'id' => $location->getId(),
                'title' => $location->isType(),
                'capacity' => $location->getCapacity(),
                'has_sanitary' => $location->isHasSanitary(),
                'has_garden' => $location->isHasGarden(),
                'has_pool' => $location->isHasPool(),
                'animal_accpeted' => $location->isAnimalAccepted(),
                'tree_height' => $location->getTreeHeight(),
                'is_available' => $location->isIsAvailable(),
                'cottage' => [
                    'id' => $location->getCategoriesCottage()->getId(),
                    'name' => $location->getCategoriesCottage()->getName(),
                    'period_minimum' => $location->getCategoriesCottage()->getPeriodMinimum(),
                    'description' => $location->getCategoriesCottage()->getDescription(),
                    'price_one_night' => $location->getCategoriesCottage()->getPriceOneNight(),
                    'privacy' => $location->getCategoriesCottage()->getPrivacy(),
                    'covers' => $this->getCoversData($location->getCategoriesCottage()->getCovers()),
                    'periods' => $this->checkBookings(
                        $location->getCategoriesCottage()->getPeriods(),
                        $location->getBookings(),
                        $location->getCategoriesCottage()->getPeriodMinimum(),
                    )
                ],
            ];

            $data[] = $locationData;
        }

        $jsonContent = $serializer->serialize($data, 'json');

        return new Response($jsonContent);
    }

    private function checkBookings(Collection $periods, Collection $bookings, int $period_minimum)
    {
        $periodsDatas = $this->getPeriodsData($periods);
        $bookingsDatas = $this->getBookingsData($bookings);

        $availablePeriods = [];

        // Créer un tableau des dates réservées
        $reservedDates = [];
        foreach ($bookingsDatas as $booking) {
            $startDate = $booking['start']->format('Y-m-d');
            $endDate = $booking['end']->format('Y-m-d');
            $reservedDates = array_merge($reservedDates, $this->getDatesRange($startDate, $endDate));
        }

        // Parcourir toutes les périodes et vérifier les disponibilités
        foreach ($periodsDatas as $period) {

            $periodId = $period['id'];
            $startDate = $period['start']->format('Y-m-d');
            $endDate = $period['end']->format('Y-m-d');
            $periodDates = $this->getDatesRange($startDate, $endDate);

            // Vérifier si les dates de la période sont disponibles
            $availableDates = array_diff($periodDates, $reservedDates);

            if (!empty($availableDates)) {
                // Diviser les dates disponibles en sous-tableaux contigus
                $contiguousDates = [];
                $tempArray = [];
                $lastDate = null;

                foreach ($availableDates as $date) {
                    $currentDate = new DateTime($date);
                    if ($lastDate !== null && $currentDate->diff($lastDate)->days !== 1) {
                        $contiguousDates[] = $tempArray;
                        $tempArray = [];
                    }
                    $tempArray[] = $date;
                    $lastDate = $currentDate;
                }

                // Ajouter le dernier sous-tableau temporaire
                if (!empty($tempArray)) {
                    $contiguousDates[] = $tempArray;
                }

                // Parcourir les sous-tableaux contigus
                foreach ($contiguousDates as $contiguousDateGroup) {

                    // Calculer la durée de chaque sous-tableau
                    $periodDuration = count($contiguousDateGroup);

                    // Vérifier si la durée de la période est supérieure ou égale à la période minimale
                    if ($periodDuration >= $period_minimum) {
                        $availablePeriods[] = [
                            'id' => $periodId,
                            'start' => new DateTime(min($contiguousDateGroup)),
                            'end' => new DateTime(max($contiguousDateGroup))
                        ];
                    }
                }
            }
        }

        return $availablePeriods;
    }

    // Fonction pour obtenir un tableau de dates entre deux dates données
    private function getDatesRange($startDate, $endDate)
    {
        $dates = [];
        $currentDate = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        while ($currentDate <= $endDateObj) {
            $dates[] = $currentDate->format('Y-m-d');
            $currentDate->modify('+1 day');
        }

        return $dates;
    }

    private function getBookingsData(Collection $bookings)
    {
        $bookingsDatas = [];

        /** @var \App\Entity\Bookings $period */
        foreach ($bookings as $booking) {
            $bookingsDatas[] = [
                'id' => $booking->getId(),
                'start' => $booking->getStartAt(),
                'end' => $booking->getEndAt(),
            ];
        }

        return $bookingsDatas;
    }

    private function getPeriodsData(Collection $periods)
    {
        $periodsData = [];

        /** @var \App\Entity\Periods $period */
        foreach ($periods as $period) {
            $periodsData[] = [
                'id' => $period->getId(),
                'start' => $period->getStartAt(),
                'end' => $period->getEndAt(),
            ];
        }

        return $periodsData;
    }

    private function getCoversData(Collection $covers)
    {
        $coversData = [];

        /** @var \App\Entity\Covers $cover */
        foreach ($covers as $cover) {
            $coversData[] = [
                'id' => $cover->getId(),
                'priority' => $cover->getPriority(),
                'path' => $cover->getPath(),
            ];
        }

        return $coversData;
    }
}

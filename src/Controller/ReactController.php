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
                    'name' => $location->getCategoriesCottage()->getName(),
                    'period_minimum' => $location->getCategoriesCottage()->getPeriodMinimum(),
                    'description' => $location->getCategoriesCottage()->getDescription(),
                    'price_one_night' => $location->getCategoriesCottage()->getPriceOneNight(),
                    'privacy' => $location->getCategoriesCottage()->getPrivacy(),
                    'covers' => $this->getCoversData($location->getCategoriesCottage()->getCovers()),

                    /**
                     * Filtrer les périodes déjà réservées
                     */
                    // 'periods' => $this->getPeriodsData($location->getCategoriesCottage()->getPeriods())
                    'periods' => $this->checkBookings($location->getCategoriesCottage()->getPeriods(), $location->getBookings())
                ],
            ];

            $data[] = $locationData;
        }

        $jsonContent = $serializer->serialize($data, 'json');

        return new Response($jsonContent);
    }

    private function checkBookings(Collection $periods, Collection $bookings)
    {
        $periodsDatas = $this->getPeriodsData($periods);
        $bookingsDatas = $this->getBookingsData($bookings);

        dd($bookingsDatas, $periodsDatas);
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

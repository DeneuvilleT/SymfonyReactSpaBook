<?php

namespace App\Controller;

use App\Entity\CategoriesCottage;
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

        $queryType = boolval($datas["cottage"]);
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
                'cottages' => $this->getCottagesData($location->getCategoriesCottage()),
                // BOOKINGS
            ];

            $data[] = $locationData;
        }

        $jsonContent = $serializer->serialize($data, 'json');

        return new Response($jsonContent);
    }

    private function getCottagesData(CategoriesCottage $cottages)
    {
        $cottageData = [];

        /** @var \App\Entity\CategoriesCottage $cottage */
        foreach ($cottages as $cottage) {
            $cottageData[] = [
                'id' => $cottage->getId(),
                'name' => $cottage->getName(),
                'description' => $cottage->getDescription(),
                'price_one_night' => $cottage->getPriceOneNight(),
                // PERIODS
                // COVERS
            ];
        }

        return $cottageData;
    }
}

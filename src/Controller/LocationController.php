<?php

namespace App\Controller;


use App\Entity\Location;
use App\Repository\LocationRepository;
// use App\Repository\RoomBedRepository;
// use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class LocationController extends AbstractController
{
    #[Route(
        '/location/search',
        name: 'app_home_search',
        methods: ['POST']
    )]
    public function searchBar(Request $request, LocationRepository $localRepo): Response
    {
        $datas = json_decode($request->getContent(), true);
        return new Response(Response::HTTP_REQUEST_TIMEOUT);
    }

    #[Route('/location/edit/{location}', name: 'app_location_edit')]
    public function edit(Location $location, Request $request, EntityManagerInterface $em, LocationRepository $locaRepo)
    {

        $typeLocation = $locaRepo->find($location);
        $className = $typeLocation->getClassName();

        $formTypeClassName = 'App\\Form\\' . $className . 'Type';

        $form = $this->createForm($formTypeClassName, $typeLocation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($typeLocation);
            $em->flush();

            return $this->redirectToRoute('app_location');
        }

        return $this->render('location/edit.html.twig', [
            'form' => $form,
        ]);
    }


    #[Route('/location', name: 'app_location')]
    public function index(LocationRepository $localRepo)
    {
        return $this->render('location/index.html.twig', [
            'locations' => $localRepo->findAll()
        ]);
    }


    #[Route('/location/create/{location?}', name: 'app_location_create')]
    public function create(string $location, Request $request, EntityManagerInterface $em): Response
    {
        $entityClassName = 'App\\Entity\\' . $location;
        $formTypeClassName = 'App\\Form\\' . $location . 'Type';

        if (!class_exists($entityClassName) || !get_parent_class($entityClassName) === $entityClassName) {
            $this->addFlash(
                'warning',
                'Mauvais formulaire'
            );
            return $this->redirectToRoute('app_location');
        }

        $entity = new ($entityClassName)();

        $form = $this->createForm($formTypeClassName, $entity);
        $form->handleRequest($request);
        // dd($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entity->setUser($this->getUser());
            $em->persist($entity);
            $em->flush();

            return $this->redirectToRoute('app_location');
        }


        return $this->render('location/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }


    #[Route('/location/find/{search}', name: 'api_city_find', methods: ['GET'])]
    public function showCityOne(String $search, EntityManagerInterface $em): Response
    {

        $find = '%' . $search . '%';
        $connect = $em->getConnection();

        $sql = 'SELECT ville_nom, ville_canton
                FROM spec_villes_france_free
                WHERE ville_nom_simple LIKE :param';
        $request = $connect->prepare($sql);
        $resulSet = $request->executeQuery(['param' => $find]);
        $result = $resulSet->fetchAllAssociative();

        return $this->json($result);
    }

    #[Route('/location/all/city', name: 'api_city_all', methods: ['GET'])]
    public function showCityAll(LocationRepository $locaRepo)
    {
        $city = $locaRepo->getAllCity();

        return $this->json([
            'city' => $city
        ]);
    }
}

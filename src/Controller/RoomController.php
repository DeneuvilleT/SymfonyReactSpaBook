<?php

namespace App\Controller;

// use App\Entity\Location;
// use App\Entity\Room;
// use App\Form\RoomType;
// use App\Repository\LocationRepository;
// use App\Repository\RoomRepository;
// use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\HttpFoundation\Request;
// use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\Routing\Annotation\Route;



class RoomController extends AbstractController
{

   // #[Route(
   //    '/room/create/{id}',
   //    name: 'app_room_add',
   //    methods: ['GET', 'POST']
   // )]
   // public function create(Location $id, Request $request, RoomRepository $roomRepo): Response
   // {
   //    $room = new Room();

   //    $form = $this->createForm(RoomType::class, $room);
   //    $form->handleRequest($request);

   //    if ($form->isSubmitted() && $form->isValid()) {
   //       $room->setLocation($id);
   //       // $roomRepo->save($room, true);

   //       dd($form);

   //       // return $this->redirectToRoute('app_location');
   //    }

   //    return $this->render(
   //       'room/add.html.twig',
   //       [
   //          'form' => $form,
   //       ]
   //    );
   // }

   // #[Route(
   //    '/room/edit/{room}',
   //    name: 'app_room_edit',
   // )]
   // public function edit(Room $room, Request $request, EntityManagerInterface $em): Response
   // {
   //    $form = $this->createForm(RoomType::class, $room);
   //    $form->handleRequest($request);

   //    if ($form->isSubmitted() && $form->isValid()) {
   //       $em->persist($room);
   //       $em->flush();

   //       return $this->redirectToRoute('app_location');
   //    }

   //    return $this->render(
   //       'room/edit.html.twig',
   //       [
   //          'form' => $form,
   //       ]
   //    );
   // }
}

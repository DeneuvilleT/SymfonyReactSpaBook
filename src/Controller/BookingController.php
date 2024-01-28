<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Location;
// use App\Form\BookingType;
use App\Repository\BookingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/booking')]
class BookingController extends AbstractController
{
    #[Route('/', name: 'app_booking_index', methods: ['GET'])]
    public function index(BookingRepository $bookingRepository): Response
    {
        return $this->render('booking/index.html.twig', [
            'bookings' => $bookingRepository->findAll(),
        ]);
    }

    #[Route('/new/{location}/{start}/{end}/{capacity}/{price}', name: 'app_booking_new', methods: ['GET', 'POST'])]
    public function new(Location $location, $start, $end, int $capacity, $price, EntityManagerInterface $em, BookingRepository $bookingRepo): Response
    {
        $booking = new Booking();

        $booking->setCreatedAt(date_create('now'));
        $booking->setStartDateAt(date_create($start));
        $booking->setEndAt(date_create($end));
        $booking->setQuantityTraveller($capacity);
        $booking->setTotalPrice($price);
        $booking->setLocation($location);
        $booking->setUser($location->getUser());

        $em->persist($booking);
        $em->flush();

        $bookings = $bookingRepo->findAll();

        return $this->redirectToRoute('app_booking_index',[
            'bookings' => $bookings
        ]);
    }

    #[Route('/{id}', name: 'app_booking_show', methods: ['GET'])]
    public function show(Booking $booking): Response
    {
        return $this->render('booking/show.html.twig', [
            'booking' => $booking,
        ]);
    }

    // #[Route('/{id}/edit', name: 'app_booking_edit', methods: ['GET', 'POST'])]
    // public function edit(Request $request, Booking $booking, BookingRepository $bookingRepository): Response
    // {
    //     $form = $this->createForm(BookingType::class, $booking);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $bookingRepository->save($booking, true);

    //         return $this->redirectToRoute('app_booking_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('booking/edit.html.twig', [
    //         'booking' => $booking,
    //         'form' => $form->createView(),
    //     ]);
    // }

    #[Route('/{id}', name: 'app_booking_delete', methods: ['POST'])]
    public function delete(Request $request, Booking $booking, BookingRepository $bookingRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$booking->getId(), $request->request->get('_token'))) {
            $bookingRepository->remove($booking, true);
        }

        return $this->redirectToRoute('app_booking_index', [], Response::HTTP_SEE_OTHER);
    }
}

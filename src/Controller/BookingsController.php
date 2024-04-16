<?php

namespace App\Controller;

use App\Entity\CategoriesCottage;
use App\Entity\LocationTypes;
use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Doctrine\Common\Collections\Collection;

#[Route('/api/v1/bookings')]
class BookingsController extends AbstractController
{
    #[Route('/load_bookings/{uid}', name: 'app_bookings_show', methods: ['GET'])]
    public function getUserOrders(string $uid, CustomerRepository $customerRepository): Response
    {
        $user = $this->getUser();
        $customer = $customerRepository->findOneByUid($uid);

        if ($user !== null && $user === $customer) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $bookings = $customer->getBookings();

            $bookingsData = [];

            foreach ($bookings as $booking) {
                $bookingsData[] = [
                    'id' => $booking->getId(),
                    'createdAt' => $booking->getCreatedAt()->format('Y-m-d H:i:s'),
                    'traveller' => $booking->getQuantityTraveller(),
                    'price' => $booking->getTotalPrice(),
                    'start' => $booking->getStartAt()->format('Y-m-d H:i:s'),
                    'end' => $booking->getEndAt()->format('Y-m-d H:i:s'),
                    'cottage' => $this->getCottageData($booking
                        ->getLocationType()->getCategoriesCottage())
                ];
            }

            $jsonContent = $serializer->serialize($bookingsData, 'json');
            return new Response($jsonContent);
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    private function getCottageData(CategoriesCottage $cottage)
    {
        $locationTypesData = [
            'id' => $cottage->getId(),
            'name' => $cottage->getName(),
            'description' => $cottage->getDescription(),
            'price' => $cottage->getPriceOneNight(),
            'privacy' => $cottage->getPrivacy(),
            'covers' => $this->getCoversData($cottage->getCovers()),
            
        ];

        return $locationTypesData;
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

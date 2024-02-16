<?php

namespace App\Repository;

use App\Entity\LocationTypes;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LocationTypes>
 *
 * @method LocationTypes|null find($id, $lockMode = null, $lockVersion = null)
 * @method LocationTypes|null findOneBy(array $criteria, array $orderBy = null)
 * @method LocationTypes[]    findAll()
 * @method LocationTypes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LocationTypesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LocationTypes::class);
    }

    public function searchLocations(int $accommodation, DateTime $begin, DateTime $end, int $capacity, bool $hasSanitary, bool $hasPool, bool $animalAccepted, bool $hasGarden): array
    {
        $query = $this
            ->createQueryBuilder("l")
            ->having("l.capacity >= :capacity")
            ->setParameter("capacity", $capacity)
            ->getQuery()->getResult();

        dd($query);
    }
}

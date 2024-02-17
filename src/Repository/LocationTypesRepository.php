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

    public function searchLocations(bool $type, DateTime $begin, DateTime $end, int $capacity, bool $hasSanitary, bool $hasPool, bool $animalAccepted, bool $hasGarden): array
    {
        // dd($type, $begin, $end, $capacity, $hasSanitary, $hasPool, $animalAccepted, $hasGarden);
        $query = $this
            ->createQueryBuilder("l")
            ->andWhere("l.type = :type")
            // ->andWhere("l.begin >= :begin")
            // ->andWhere("l.end >= :end")
            ->andWhere("l.capacity >= :capacity")
            ->andWhere("l.has_sanitary >= :hasSanitary")
            ->andWhere("l.has_pool >= :hasPool")
            ->andWhere("l.animal_accepted >= :animalAccepted")
            ->andWhere("l.has_garden >= :hasGarden")
            ->setParameters([
                "type" => $type,
                // "begin" => $begin,
                // "end" => $end,
                "capacity" => $capacity,
                "hasSanitary" => $hasSanitary,
                "hasPool" => $hasPool,
                "animalAccepted" => $animalAccepted,
                "hasGarden" => $hasGarden,
            ])
            ->getQuery()
            ->getResult();

        return $query;
        //dd($type, $capacity, $query);
    }
}

<?php

namespace App\Repository;

use DateTime;
use App\Entity\LocationTypes;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

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

    public function searchLocations(?bool $type, DateTime $begin, DateTime $end, int $capacity, bool $hasSanitary, bool $hasPool, bool $animalAccepted, bool $hasGarden): array
    {
        $query = $this->createQueryBuilder("l");

        $type === null ? $query->andWhere("l.type IN (0, 1)") : $query->andWhere("l.type = :type");

        // ->andWhere("l.begin >= :begin")
        // ->andWhere("l.end >= :end")
        $query->andWhere("l.capacity >= :capacity")
            ->andWhere("l.has_sanitary >= :hasSanitary")
            ->andWhere("l.has_pool >= :hasPool")
            ->andWhere("l.animal_accepted >= :animalAccepted")
            ->andWhere("l.has_garden >= :hasGarden");

        $parameters = [
            // "begin" => $begin,
            // "end" => $end,
            "capacity" => $capacity,
            "hasSanitary" => $hasSanitary,
            "hasPool" => $hasPool,
            "animalAccepted" => $animalAccepted,
            "hasGarden" => $hasGarden,
        ];

        if ($type !== null) {
            $parameters["type"] = $type;
        }

        $query->setParameters($parameters);

        $results = $query->getQuery()->getResult();

        $arrayResults = [];
        foreach ($results as $result) {
            $arrayResults[] = $result;
        }

        return $arrayResults;
    }
}

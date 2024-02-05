<?php

namespace App\Repository;

use App\Entity\Location;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Location>
 *
 * @method Location|null find($id, $lockMode = null, $lockVersion = null)
 * @method Location|null findOneBy(array $criteria, array $orderBy = null)
 * @method Location[]    findAll()
 * @method Location[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Location::class);
    }

    public function save(Location $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Location $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getAllCity()
    {
        $conect = $this->getEntityManager()->getConnection();

        $sql = 'SELECT ville_departement, ville_nom_simple, ville_latitude_deg, ville_longitude_deg
                FROM spec_villes_france_free
                WHERE 1';
        $send = $conect->prepare($sql);

        $resulSet = $send->executeQuery([]);
        return $resulSet->fetchAllAssociative();
    }


    public function findCapacity($capacity): array
    {
        if ($capacity > 0) {
            return $this
                ->createQueryBuilder('l')
                ->join("l.room", "r")
                ->join("r.roomBed", "rb")
                ->join("rb.bed", "b")
                ->groupBy("l")
                ->having("SUM(b.capacity * rb.quantity) >= :capacity")
                ->setParameter("capacity", $capacity)
                ->getQuery()->getResult();
        }
    }

    public function search(string $city,  $start,  $end, int $capacity = 0): array
    {
        $qb = $this->createQueryBuilder("l");

        if ($city === "") $city = 'PARIS';

        $connect = $this->getEntityManager()->getConnection();
        $query = 'SELECT ville_longitude_deg, ville_latitude_deg 
                    FROM spec_villes_france_free
                    WHERE ville_nom = :nom';

        $sql = $connect->prepare($query);
        $resultSet = $sql->executeQuery(['nom' => strtoupper($city)]);
        $city = $resultSet->fetchAssociative();

        if (empty($city)) return [];

        // DATE
        $qbDate = $this->createQueryBuilder("l2")
            ->join("l2.bookings", 'booking')
            ->where(":end > booking.startDateAt")
            ->andWhere(":start < booking.endAt");

        // CAPACITY
        $qb->join('l.room', 'r')
            ->join('r.roomBed', 'rb')
            ->join('rb.bed', 'b')
            ->groupBy("l")
            ->andHaving("SUM(b.capacity * rb.quantity) >= :capacity")
            ->setParameter("capacity", $capacity);

        // DISTANCE
        $qb->addSelect("ACOS(SIN(PI()*l.Latitude/180.0)*SIN(PI()*:lat2/180.0)+COS(PI()*l.Latitude/180.0)*COS(PI()*:lat2/180.0)*COS(PI()*:lon2/180.0-PI()*l.Longitude/180.0))*6371 AS dist")
            ->setParameter(":lat2", $city["ville_latitude_deg"])
            ->setParameter(":lon2", $city["ville_longitude_deg"])
            ->orderBy("dist");

        
        $qb->where($qb->expr()->notIn("l.id", $qbDate->getDQL()))
            ->setParameter("end", $end)
            ->setParameter("start", $start);

        return $qb->getQuery()->getResult();
    }
}

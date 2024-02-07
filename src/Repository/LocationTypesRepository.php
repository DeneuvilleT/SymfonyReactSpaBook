<?php

namespace App\Repository;

use App\Entity\LocationTypes;
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

//    /**
//     * @return LocationTypes[] Returns an array of LocationTypes objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('l.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?LocationTypes
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

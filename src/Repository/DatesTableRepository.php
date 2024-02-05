<?php

namespace App\Repository;

use App\Entity\DatesTable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DatesTable>
 *
 * @method DatesTable|null find($id, $lockMode = null, $lockVersion = null)
 * @method DatesTable|null findOneBy(array $criteria, array $orderBy = null)
 * @method DatesTable[]    findAll()
 * @method DatesTable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DatesTableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DatesTable::class);
    }

//    /**
//     * @return DatesTable[] Returns an array of DatesTable objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DatesTable
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

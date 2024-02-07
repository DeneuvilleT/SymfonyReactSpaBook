<?php

namespace App\Repository;

use App\Entity\CategoriesCottage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CategoriesCottage>
 *
 * @method CategoriesCottage|null find($id, $lockMode = null, $lockVersion = null)
 * @method CategoriesCottage|null findOneBy(array $criteria, array $orderBy = null)
 * @method CategoriesCottage[]    findAll()
 * @method CategoriesCottage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoriesCottageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CategoriesCottage::class);
    }

//    /**
//     * @return CategoriesCottage[] Returns an array of CategoriesCottage objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CategoriesCottage
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

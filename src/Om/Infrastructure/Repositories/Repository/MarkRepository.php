<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\Domain\Entity\MarkRepositoryInterface;
use App\Om\Infrastructure\Hydrator\Hydrator;
use App\Om\Infrastructure\Repositories\Entity\Mark as ORMMark;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Om\Domain\Entity\Mark;
use Exception;

/**
 * @extends ServiceEntityRepository<ORMMark>
 *
 * @method ORMMark|null find($id, $lockMode = null, $lockVersion = null)
 * @method ORMMark|null findOneBy(array $criteria, array $orderBy = null)
 * @method ORMMark[]    findAll()
 * @method ORMMark[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarkRepository extends ServiceEntityRepository implements MarkRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ORMMark::class);
    }

    public function get(int $id): Mark
    {
        $ORMMark = $this->find($id);
        if (empty($ORMMark)) {
            throw new Exception("Element with current index " . " does not exist", ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Mark::class, [
                "student_id" => $ORMMark->getStudentId(),
                "student_mark" => $ORMMark->getStudentMark(),
                "id" => $ORMMark->getId(),
            ]
        );
    }

    public function store(Mark $mark): void
    {
        $ORMMark = new ORMMark();
        $entityManager = $this->getEntityManager();

        $ORMMark->setId($mark->getId());
        $ORMMark->setStudentId($mark->getStudentId());
        $ORMMark->setStudentMark($mark->getStudentMark());

        $entityManager->persist($ORMMark);
        $entityManager->flush();
    }

    public function update(Mark $mark): void
    {
        $ORMMark = $this->find($mark->getId());
        $entityManager = $this->getEntityManager();

        $ORMMark->setStudentId($mark->getStudentMark());
        $ORMMark->setStudentMark($mark->getStudentMark());

        $entityManager->flush();
    }

    public function delete(int $id): void
    {
        $ORMMark = $this->find($id);
        $entityManager = $this->getEntityManager();

        $entityManager->remove($ORMMark);
        $entityManager->flush();
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT max(m.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m'
        );
        return $query->getResult()[0][1] + 1;
    }
}

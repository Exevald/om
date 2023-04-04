<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Student;
use App\Om\Domain\Entity\StudentRepositoryInterface;
use App\Om\Infrastructure\Repositories\Entity\Student as ORMStudent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Om\Infrastructure\Hydrator\Hydrator;
use Exception;

/**
 * @extends ServiceEntityRepository<ORMStudent>
 *
 * @method ORMStudent|null find($id, $lockMode = null, $lockVersion = null)
 * @method ORMStudent|null findOneBy(array $criteria, array $orderBy = null)
 * @method ORMStudent[]    findAll()
 * @method ORMStudent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StudentRepository extends ServiceEntityRepository implements StudentRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ORMStudent::class);
    }

    public function get(int $id): Student
    {
        $ORMStudent = $this->find($id);
        if (empty($ORMStudent)) {
            throw new Exception("Element with current index " . $id . " does not exist", ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Student::class, [
                "first_name" => $ORMStudent->getFirstName(),
                "last_name" => $ORMStudent->getLastName(),
                "id" => $ORMStudent->getId(),
            ]
        );
    }

    public function store(Student $student): void
    {
        $ORMStudent = new ORMStudent();
        $entityManager = $this->getEntityManager();

        $ORMStudent->setId($student->getId());
        $ORMStudent->setFirstName($student->getFirstName());
        $ORMStudent->setLastName($student->getLastName());

        $entityManager->persist($ORMStudent);
        $entityManager->flush();
    }

    public function delete(int $id): void
    {
        $ORMStudent = $this->find($id);
        $entityManager = $this->getEntityManager();
        $entityManager->remove($ORMStudent);
        $entityManager->flush();
    }

    public function update(Student $student): void
    {
        $ORMStudent = $this->find($student->getId());
        $entityManager = $this->getEntityManager();

        $ORMStudent->setFirstName($student->getFirstName());
        $ORMStudent->setLastName($student->getLastName());

        $entityManager->flush();
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT max(s.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s'
        );
        return $query->getResult()[0][1] + 1;
    }

}

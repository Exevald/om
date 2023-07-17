<?php

namespace App\Om\Infrastructure\Query;

use App\Common\ErrorType;
use App\Om\App\Query\Data\Student;
use App\Om\App\Query\StudentQueryServiceInterface;
use App\Om\Infrastructure\Hydrator\Hydrator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

class StudentQueryService extends ServiceEntityRepository implements StudentQueryServiceInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, \App\Om\Infrastructure\Repositories\Entity\Student::class);
    }

    public function getStudentById(int $studentId): Student
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s
                                                  WHERE s.id = :id
                                                  ORDER BY s.id ASC'
        )->setParameter('id', $studentId);
        $ORMStudent = $query->getResult();
        if (empty($ORMStudent)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        $ORMStudent = $ORMStudent[0];
        return $hydrator->hydrate(Student::class, [
            'id' => $ORMStudent->getId(),
            'firstName' => $ORMStudent->getFirstName(),
            'lastName' => $ORMStudent->getLastName(),
        ]);
    }

    public function getStudentsByGroupId(int $groupId): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :groupId AND group_student.student_id = s.id
                                                  ORDER BY s.id ASC'
        )->setParameter('groupId', $groupId);
        $ORMStudents = $query->getResult();
        $students = [];
        foreach ($ORMStudents as $ORMStudent) {
            $hydrator = new Hydrator();
            $students[] = $hydrator->hydrate(Student::class, [
                'id' => $ORMStudent->getId(),
                'firstName' => $ORMStudent->getFirstName(),
                'lastName' => $ORMStudent->getLastName(),
            ]);
        }
        return $students;
    }

    public function getAllStudents(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s
                                                  ORDER BY s.id ASC'
        );
        $ORMStudents = $query->getResult();
        $students = [];
        foreach ($ORMStudents as $ORMStudent) {
            $hydrator = new Hydrator();
            $students[] = $hydrator->hydrate(Student::class, [
                'id' => $ORMStudent->getId(),
                'firstName' => $ORMStudent->getFirstName(),
                'lastName' => $ORMStudent->getLastName(),
            ]);
        }
        return $students;
    }
}
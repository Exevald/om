<?php

namespace App\Om\Infrastructure\Query;

use App\Common\ErrorType;
use App\Om\App\Query\Data\Teacher;
use App\Om\App\Query\TeacherQueryServiceInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Om\Infrastructure\Hydrator\Hydrator;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

class TeacherQueryService extends ServiceEntityRepository implements TeacherQueryServiceInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, \App\Om\Infrastructure\Repositories\Entity\Teacher::class);
    }

    public function getTeacherByToken(string $token): Teacher
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher t
                                                  WHERE t.login_key = :token'
        )->setParameter('token', $token);
        $ORMTeachers = $query->getResult();
        if (empty($ORMTeachers)) {
            throw new Exception("Teacher has been not found by session token", ErrorType::UNAUTHORIZED->value);
        }
        $ORMTeacher = $ORMTeachers[0];
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $ORMTeacher->getId(),
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
        ]);
    }

    public function getTeacherById(int $teacherId): Teacher
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher t
                                                  WHERE t.id = :id
                                                  ORDER BY t.id ASC'
        )->setParameter('id', $teacherId);
        $ORMTeacher = $query->getResult();
        if (empty($ORMTeacher)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $ORMTeacher->getId(),
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
        ]);
    }

    public function getTeacherByEmail(string $email): Teacher
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher t
                                                  WHERE t.email = :email
                                                  ORDER BY t.email ASC'
        )->setParameter('email', $email);
        $ORMTeacher = $query->getResult();
        if (empty($ORMTeacher)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $ORMTeacher->getId(),
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
        ]);
    }

    public function getAllTeachers(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher t
                                                  ORDER BY t.id ASC'
        );
        $ORMTeachers = $query->getResult();
        $teachers = [];
        foreach ($ORMTeachers as $ORMTeacher) {
            $hydrator = new Hydrator();
            $teachers[] = $hydrator->hydrate(Teacher::class, [
                'id' => $ORMTeacher->getId(),
                'firstName' => $ORMTeacher->getFirstName(),
                'lastName' => $ORMTeacher->getLastName(),
                'email' => $ORMTeacher->getEmail(),
                'password' => $ORMTeacher->getPassword(),
            ]);
        }
        return $teachers;
    }

}
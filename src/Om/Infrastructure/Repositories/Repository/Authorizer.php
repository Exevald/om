<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\App\Auth\AuthorizerInterface;
use App\Om\Infrastructure\Generator\AccessKeyGenerator;
use App\Om\Infrastructure\Repositories\Entity\Teacher;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

class Authorizer extends ServiceEntityRepository implements AuthorizerInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Teacher::class);
    }

    public function login(string $email, string $password): string
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT teacher
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher teacher
                                                  WHERE teacher.email = :email
                                                  ORDER BY teacher.email ASC'

        )->setParameter("email", $email);
        $ORMTeachers = $query->getResult();
        if (empty($ORMTeachers)) {
            throw new Exception("Teacher with " . $email . "does not exist", ErrorType::NOT_FOUND->value);
        }
        $ORMTeacher = $ORMTeachers[0];
        if ($ORMTeacher->getPassword() !== $password) {
            throw new Exception("Password is wrong", ErrorType::UNAUTHORIZED->value);
        }
        $generator = new AccessKeyGenerator();
        $token = $generator->generateAccessKey();
        $ORMTeacher->setLoginKey($token);

        $entityManager->persist($ORMTeacher);
        $entityManager->flush();

        return $token;
    }

    public function validateToken(string $token): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT teacher.id
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher teacher
                                                  WHERE teacher.login_key = :token'
        )->setParameter("token", $token);
        $teachers = $query->getResult();
        if (empty($teachers)) {
            throw new Exception("The session does not exist", ErrorType::UNAUTHORIZED->value);
        }

        return $teachers[0]["id"];
    }

}
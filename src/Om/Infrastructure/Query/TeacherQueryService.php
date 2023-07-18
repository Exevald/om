<?php

namespace App\Om\Infrastructure\Query;

use App\Om\App\Query\Data\Teacher;
use App\Om\App\Query\TeacherQueryServiceInterface;
use App\Om\Domain\ErrorType\ErrorType;
use App\Om\Infrastructure\Hydrator\Hydrator;
use App\Om\Infrastructure\Repositories\Entity\Group;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
        $teacherId = $ORMTeacher->getId();
        $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id AND teacher_group.group_id = g.id
                                                  ORDER BY g.id ASC'
        )->setParameter('id', $teacherId);
        $groupsList = $query->getResult();

        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $teacherId,
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
            'groupIdList' => $groupsList,
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
        $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id AND teacher_group.group_id = g.id
                                                  ORDER BY g.id ASC'
        )->setParameter('id', $teacherId);
        $groupsList = $query->getResult();

        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $ORMTeacher->getId(),
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
            'groupIdList' => $groupsList,
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
        $teacherId = $ORMTeacher->getId();
        $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id AND teacher_group.group_id = g.id
                                                  ORDER BY g.id ASC'
        )->setParameter('id', $teacherId);
        $groupsList = $query->getResult();

        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
            'id' => $teacherId,
            'firstName' => $ORMTeacher->getFirstName(),
            'lastName' => $ORMTeacher->getLastName(),
            'email' => $ORMTeacher->getEmail(),
            'password' => $ORMTeacher->getPassword(),
            'groupIdList' => $groupsList,
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
            $teacherId = $ORMTeacher->getId();
            $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id AND teacher_group.group_id = g.id
                                                  ORDER BY g.id ASC'
            )->setParameter('id', $teacherId);
            $groupsList = $query->getResult();

            $hydrator = new Hydrator();
            $teachers[] = $hydrator->hydrate(Teacher::class, [
                'id' => $teacherId,
                'firstName' => $ORMTeacher->getFirstName(),
                'lastName' => $ORMTeacher->getLastName(),
                'email' => $ORMTeacher->getEmail(),
                'password' => $ORMTeacher->getPassword(),
                'groupIdList' => $groupsList,
            ]);
        }
        return $teachers;
    }

}
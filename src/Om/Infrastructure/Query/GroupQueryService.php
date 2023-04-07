<?php

namespace App\Om\Infrastructure\Query;

use App\Common\ErrorType;
use App\Om\App\Query\Data\Group;
use App\Om\App\Query\GroupQueryServiceInterface;
use App\Om\Infrastructure\Hydrator\Hydrator;
use App\Om\Infrastructure\Repositories\Entity\Student;
use App\Om\Infrastructure\Repositories\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

class GroupQueryService extends ServiceEntityRepository implements GroupQueryServiceInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, \App\Om\Infrastructure\Repositories\Entity\Group::class);
    }

    public function getGroupById(int $groupId): Group
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g
                                                  WHERE g.id = :id
                                                  ORDER BY g.id ASC'
        )->setParameter('id', $groupId);
        $ORMGroups = $query->getResult();
        $entityManager = $this->getEntityManager()->getRepository(Student::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :id AND group_student.student_id = s.id
                                                  ORDER BY s.id ASC'
        )->setParameter('id', $groupId);
        $studentsList = $query->getResult();

        $entityManager = $this->getEntityManager()->getRepository(Task::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group_id = :id AND group_student.task_id = t.id
                                                  ORDER BY t.id ASC'
        )->setParameter('id', $groupId);
        $tasksList = $query->getResult();
        if (empty($ORMGroups)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $ORMGroup = $ORMGroups[0];
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Group::class, [
            'id' => $ORMGroup->getId(),
            'title' => $ORMGroup->getTitle(),
            'subject' => $ORMGroup->getSubject(),
            'studentsIdList' => $studentsList,
            'tasksIdList' => $tasksList,
        ]);
    }

    public function getGroupByName(string $groupTitle): Group
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g
                                                  WHERE g.title = :groupTitle
                                                  ORDER BY g.id ASC'
        )->setParameter('groupTitle', $groupTitle);
        $ORMGroups = $query->getResult();
        if (empty($ORMGroups)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        return $ORMGroups[0]["id"];
    }

    public function getGroupsByTeacherId(int $teacherId): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :teacherId AND g.id = teacher_group.group_id
                                                  ORDER BY g.id ASC'
        )->setParameter('teacherId', $teacherId);
        $ORMGroups = $query->getResult();
        $groups = [];
        foreach ($ORMGroups as $ORMGroup) {
            $groupId = $ORMGroup->getId();
            $entityManager = $this->getEntityManager()->getRepository(Student::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :id AND group_student.student_id = s.id
                                                  ORDER BY s.id ASC'
            )->setParameter('id', $groupId);
            $studentsList = $query->getResult();

            $entityManager = $this->getEntityManager()->getRepository(Task::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group_id = :id AND group_student.task_id = t.id
                                                  ORDER BY t.id ASC'
            )->setParameter('id', $groupId);
            $tasksList = $query->getResult();
            $hydrator = new Hydrator();
            $groups[] = $hydrator->hydrate(Group::class, [
                'id' => $groupId,
                'title' => $ORMGroup->getTitle(),
                'subject' => $ORMGroup->getSubject(),
                'studentsIdList' => $studentsList,
                'tasksIdList' => $tasksList,
            ]);
        }
        return $groups;
    }

    public function getAllGroups(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT g
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g
                                                  ORDER BY g.id ASC'
        );
        $ORMGroups = $query->getResult();
        $groups = [];
        foreach ($ORMGroups as $ORMGroup) {
            $groupId = $ORMGroup->getId();
            $entityManager = $this->getEntityManager()->getRepository(Student::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT s
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student s INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :id AND group_student.student_id = s.id
                                                  ORDER BY s.id ASC'
            )->setParameter('id', $groupId);
            $studentsList = $query->getResult();

            $entityManager = $this->getEntityManager()->getRepository(Task::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group_id = :id AND group_student.task_id = t.id
                                                  ORDER BY t.id ASC'
            )->setParameter('id', $groupId);
            $tasksList = $query->getResult();
            $hydrator = new Hydrator();
            $groups[] = $hydrator->hydrate(Group::class, [
                'id' => $groupId,
                'title' => $ORMGroup->getTitle(),
                'subject' => $ORMGroup->getSubject(),
                'studentsIdList' => $studentsList,
                'tasksIdList' => $tasksList,
            ]);
        }
        if (empty($groups)) {
            throw new Exception("", ErrorType::NOT_FOUND->value);
        }
        return $groups;
    }

}
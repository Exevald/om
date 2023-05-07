<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Group;
use App\Om\Infrastructure\Repositories\Entity\Group as ORMGroup;
use App\Om\Domain\Entity\GroupRepositoryInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Om\Infrastructure\Repositories\Entity\Student;
use Exception;
use App\Om\Infrastructure\Hydrator\Hydrator;
use App\Om\Infrastructure\Repositories\Entity\GroupStudent as ORMGroupStudent;
use App\Om\Infrastructure\Repositories\Entity\GroupTask as ORMGroupTask;

/**
 * @extends ServiceEntityRepository<ORMGroup>
 *
 * @method ORMGroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method ORMGroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method ORMGroup[]    findAll()
 * @method ORMGroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupRepository extends ServiceEntityRepository implements GroupRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ORMGroup::class);
    }

    public function get(int $id): Group
    {
        $ORMGroup = $this->find($id);
        if (empty($ORMGroup)) {
            throw new Exception("Element with current index " . $id . " does not exist", ErrorType::NOT_FOUND->value);
        }
        $entityManager = $this->getEntityManager()->getRepository(Student::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT student.id
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Student student INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :id AND student.id = group_student.student_id
                                                  ORDER BY student.id ASC'
        )->setParameter('id', $id);
        $studentResult = $query->getResult();
        $studentsList = [];
        if (!empty($studentResult)) {
            for ($i = 0; $i < count($studentResult); $i++) {
                $studentId = $studentResult[$i]["id"];
                if (!is_int($studentId)) {
                    throw new Exception("studentId is not integer", 420);
                }
                $studentsList[] = $studentId;
            }
        }
        $query = $entityManager->createQuery('SELECT task.id
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task task INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group_id = :id AND task.id = group_task.task_id
                                                  ORDER BY task.id ASC'
        )->setParameter('id', $id);
        $taskResult = $query->getResult();
        $tasksList = [];
        if (!empty($taskResult)) {
            for ($i = 0; $i < count($taskResult); $i++) {
                $taskId = $taskResult[$i]["id"];
                if (!is_int($taskId)) {
                    throw new Exception("taskId is not integer", 420);
                }
                $tasksList[] = $taskId;
            }
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Group::class, [
                "title" => $ORMGroup->getTitle(),
                "subject" => $ORMGroup->getSubject(),
                "studentsIdList" => $studentsList,
                "tasksIdList" => $tasksList,
            ]
        );
    }

    public function store(Group $group): void
    {
        $ORMGroup = new ORMGroup();
        $entityManager = $this->getEntityManager();

        $ORMGroup->setId($group->getId());
        $ORMGroup->setTitle($group->getTitle());
        $ORMGroup->setSubject($group->getSubject());

        $entityManager->persist($ORMGroup);
        $entityManager->flush();
        $this->addStudentAffiliation($group->getId(), $group->getStudentsIdList());
        $this->addTaskAffiliation($group->getId(), $group->getTasksIdList());
    }

    public function update(Group $group): void
    {
        $entityManager = $this->getEntityManager();

        $ORMGroup = $this->find($group->getId());
        $ORMGroup->setId($group->getId());
        $ORMGroup->setTitle($group->getTitle());
        $ORMGroup->setSubject($group->getSubject());

        $this->updateStudentAffiliation($group->getId(), $group->getStudentsIdList());
        $this->updateTaskAffiliation($group->getId(), $group->getTasksIdList());
        $entityManager->persist($ORMGroup);
        $entityManager->flush();
    }

    public function delete(int $id): void
    {
        $entityManager = $this->getEntityManager();
        $ORMGroup = $this->find($id);
        $entityManager->remove($ORMGroup);
        $entityManager->flush();
    }

    public function updateStudentAffiliation(int $groupId, array $studentsList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMGroupStudent::class)->getEntityManager();
        $query = $entityManager->createQuery('DELETE
                                                  FROM App\Om\Infrastructure\Repositories\Entity\GroupStudent group_student
                                                  WHERE group_student.group_id = :id'

        )->setParameter('id', $groupId);
        $query->getResult();
        foreach ($studentsList as $studentId) {
            $ORMGroupStudent = new ORMGroupStudent();
            $ORMGroupStudent->setGroupId($groupId);
            $ORMGroupStudent->setStudentId($studentId);
            $entityManager->persist($ORMGroupStudent);
            $entityManager->flush();
        }
    }

    public function updateTaskAffiliation(int $groupId, array $tasksList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMGroupTask::class)->getEntityManager();
        $query = $entityManager->createQuery('DELETE
                                                  FROM App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group.id = :id'
        )->setParameter('id', $groupId);
        $query->getResult();
        foreach ($tasksList as $taskId) {
            $ORMGroupTask = new ORMGroupTask();
            $ORMGroupTask->setGroupId($groupId);
            $ORMGroupTask->setTaskId($taskId);
            $entityManager->persist($ORMGroupTask);
            $entityManager->flush();
        }
    }

    public function addStudentAffiliation(int $groupId, array $studentsList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMGroupStudent::class)->getEntityManager();
        foreach ($studentsList as $studentId) {
            $ORMGroupStudent = new ORMGroupStudent();
            $ORMGroupStudent->setGroupId($groupId);
            $ORMGroupStudent->setStudentId($studentId);
            $entityManager->persist($ORMGroupStudent);
            $entityManager->flush();
        }
    }

    public function addTaskAffiliation(int $groupId, array $tasksList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMGroupStudent::class)->getEntityManager();
        foreach ($tasksList as $taskId) {
            $ORMGroupTask = new ORMGroupTask();
            $ORMGroupTask->setGroupId($groupId);
            $ORMGroupTask->setTaskId($taskId);
            $entityManager->persist($ORMGroupTask);
            $entityManager->flush();
        }
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT max(g.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g'
        );
        return $query->getResult()[0][1] + 1;
    }

}

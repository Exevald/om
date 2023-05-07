<?php

namespace App\Om\Infrastructure\Query;

use App\Common\ErrorType;
use App\Om\App\Query\Data\Task;
use App\Om\Infrastructure\Repositories\Entity\Mark;
use App\Om\App\Query\TaskQueryServiceInterface;
use App\Om\Infrastructure\Hydrator\Hydrator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

class TaskQueryService extends ServiceEntityRepository implements TaskQueryServiceInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, \App\Om\Infrastructure\Repositories\Entity\Task::class);
    }

    public function getTaskById(int $taskId): Task
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t
                                                  WHERE t.id = :id
                                                  ORDER BY t.id ASC'
        )->setParameter('id', $taskId);
        $ORMTasks = $query->getResult();
        if (empty($ORMTasks)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $ORMTask = $ORMTasks[0];
        $entityManager = $this->getEntityManager()->getRepository(Mark::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id AND task_mark.mark_id = m.id
                                                  ORDER BY m.id ASC'
        )->setParameter('id', $taskId);
        $marksList = $query->getResult();

        $hydrator = new Hydrator();
        return $hydrator->hydrate(Task::class, [
            'id' => $ORMTask->getId(),
            'topic' => $ORMTask->getTopic(),
            'description' => $ORMTask->getDescription(),
            'date' => $ORMTask->getDate(),
            'maxMark' => $ORMTask->getMaxMark(),
            'marksList' => $marksList,
        ]);
    }

    public function getTaskByTopic(string $taskTopic): Task
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t
                                                  WHERE t.topic = :topic
                                                  ORDER BY t.id ASC'
        )->setParameter('topic', $taskTopic);
        $ORMTasks = $query->getResult();
        if (empty($ORMTasks)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $ORMTask = $ORMTasks[0];
        $taskId = $ORMTask->getTopic();
        $entityManager = $this->getEntityManager()->getRepository(Mark::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id AND task_mark.mark_id = m.id
                                                  ORDER BY m.id ASC'
        )->setParameter('id', $taskId);
        $marksList = $query->getResult();

        $hydrator = new Hydrator();
        return $hydrator->hydrate(Task::class, [
            'id' => $ORMTask->getId(),
            'topic' => $ORMTask->getTopic(),
            'description' => $ORMTask->getDescription(),
            'date' => $ORMTask->getDate(),
            'maxMark' => $ORMTask->getMaxMark(),
            'marksList' => $marksList,
        ]);
    }

    public function getTasksByGroupId(int $groupId): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t INNER JOIN App\Om\Infrastructure\Repositories\Entity\GroupTask group_task
                                                  WHERE group_task.group_id = :groupId AND group_task.task_id = t.id
                                                  ORDER BY t.id ASC'
        )->setParameter('groupId', $groupId);
        $ORMTasks = $query->getResult();
        $tasks = [];
        foreach ($ORMTasks as $ORMTask) {
            $taskId = $ORMTask->getId();
            $entityManager = $this->getEntityManager()->getRepository(Mark::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id AND task_mark.mark_id = m.id
                                                  ORDER BY m.id ASC'
            )->setParameter('id', $taskId);
            $marksList = $query->getResult();
            $hydrator = new Hydrator();
            $tasks[] = $hydrator->hydrate(Task::class, [
                'id' => $ORMTask->getId(),
                'topic' => $ORMTask->getTopic(),
                'description' => $ORMTask->getDescription(),
                'date' => $ORMTask->getDate(),
                'maxMark' => $ORMTask->getMaxMark(),
                'marksList' => $marksList,
            ]);
        }
        return $tasks;
    }

    public function getAllTasks(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT t
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t
                                                  ORDER BY t.id ASC'
        );
        $ORMTasks = $query->getResult();
        $tasks = [];
        foreach ($ORMTasks as $ORMTask) {
            $taskId = $ORMTask->getId();
            $entityManager = $this->getEntityManager()->getRepository(Mark::class)->getEntityManager();
            $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id AND task_mark.mark_id = m.id
                                                  ORDER BY m.id ASC'
            )->setParameter('id', $taskId);
            $marksList = $query->getResult();
            $hydrator = new Hydrator();
            $tasks[] = $hydrator->hydrate(Task::class, [
                'id' => $ORMTask->getId(),
                'topic' => $ORMTask->getTopic(),
                'description' => $ORMTask->getDescription(),
                'date' => $ORMTask->getDate(),
                'maxMark' => $ORMTask->getMaxMark(),
                'marksList' => $marksList,
            ]);
        }
        if (empty($tasks)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        return $tasks;
    }
}
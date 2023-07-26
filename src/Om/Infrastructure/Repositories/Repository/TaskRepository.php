<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Om\Domain\Entity\Task;
use App\Om\Domain\Entity\TaskRepositoryInterface;
use App\Om\Domain\ErrorType\ErrorType;
use App\Om\Infrastructure\Hydrator\Hydrator;
use App\Om\Infrastructure\Repositories\Entity\Mark;
use App\Om\Infrastructure\Repositories\Entity\Task as ORMTask;
use App\Om\Infrastructure\Repositories\Entity\TaskMark as ORMTaskMark;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

/**
 * @extends ServiceEntityRepository<ORMTask>
 *
 * @method ORMTask|null find($id, $lockMode = null, $lockVersion = null)
 * @method ORMTask|null findOneBy(array $criteria, array $orderBy = null)
 * @method ORMTask[]    findAll()
 * @method ORMTask[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository implements TaskRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ORMTask::class);
    }

    public function get(int $id): Task
    {
        $ORMTask = $this->find($id);
        if (empty($ORMTask)) {
            throw new Exception("Element with index " . $id . " does not exists", ErrorType::NOT_FOUND->value);
        }
        $entityManager = $this->getEntityManager()->getRepository(Mark::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT mark.id
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark mark INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id AND mark.id = task_mark.mark_id
                                                  ORDER BY mark.id ASC'
        )->setParameter('id', $id);
        $markResult = $query->getResult();
        $marksList = [];
        if (!empty($markResult)) {
            for ($i = 0; $i < count($markResult); $i++) {
                $markId = $markResult[$i]["id"];
                if (!is_int($markId)) {
                    throw new Exception("markId is not integer", 420);
                }
                $marksList[] = $markId;
            }
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Task::class, [
                "id" => $ORMTask->getId(),
                "topic" => $ORMTask->getTopic(),
                "description" => $ORMTask->getDescription(),
                "date" => $ORMTask->getDate(),
                "maxMark" => $ORMTask->getMaxMark(),
                "marksList" => $marksList,
            ]
        );
    }

    public function store(Task $task): void
    {
        $ORMTask = new ORMTask();
        $entityManager = $this->getEntityManager();

        $ORMTask->setId($task->getId());
        $ORMTask->setTopic($task->getTopic());
        $ORMTask->setDescription($task->getDescription());
        $ORMTask->setDate($task->getDate());
        $ORMTask->setMaxMark($task->getMaxMark());

        $entityManager->persist($ORMTask);
        $entityManager->flush();
        $this->addMarkAffiliation($task->getId(), $task->getMarksList());

    }

    public function update(Task $task): void
    {
        $entityManager = $this->getEntityManager();

        $ORMTask = $this->find($task->getId());
        $ORMTask->setId($task->getId());
        $ORMTask->setTopic($task->getTopic());
        $ORMTask->setDescription($task->getDescription());
        $ORMTask->setDate($task->getDate());
        $ORMTask->setMaxMark($task->getMaxMark());

        $this->updateMarkAffiliation($task->getId(), $task->getMarksList());
        $entityManager->persist($ORMTask);
        $entityManager->flush();
    }

    public function delete(int $id): void
    {
        $entityManager = $this->getEntityManager();
        $ORMTask = $this->find($id);
        $entityManager->remove($ORMTask);
        $entityManager->flush();
    }

    public function updateMarkAffiliation(int $taskId, array $marksList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMTaskMark::class)->getEntityManager();
        $query = $entityManager->createQuery('DELETE
                                                  FROM App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :id'
        )->setParameter('id', $taskId);
        $query->getResult();
        foreach ($marksList as $markId) {
            $ORMTaskMark = new ORMTaskMark();
            $ORMTaskMark->setTaskId($taskId);
            $ORMTaskMark->setMarkId($markId);
            $entityManager->persist($ORMTaskMark);
            $entityManager->flush();
        }
    }

    public function addMarkAffiliation(int $taskId, array $marksList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(ORMTaskMark::class)->getEntityManager();
        foreach ($marksList as $markId) {
            $ORMTaskMark = new ORMTaskMark();
            $ORMTaskMark->setTaskId($taskId);
            $ORMTaskMark->setMarkId($markId);
            $entityManager->persist($ORMTaskMark);
            $entityManager->flush();
        }
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT max(t.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Task t'
        );
        return $query->getResult()[0][1] + 1;
    }

}

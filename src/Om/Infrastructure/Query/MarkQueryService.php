<?php

namespace App\Om\Infrastructure\Query;

use App\Om\App\Query\Data\Mark;
use App\Om\App\Query\MarkQueryServiceInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Common\ErrorType;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use App\Om\Infrastructure\Hydrator\Hydrator;

class MarkQueryService extends ServiceEntityRepository implements MarkQueryServiceInterface
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, \App\Om\Infrastructure\Repositories\Entity\Mark::class);
    }

    public function getMarkById(int $markId): Mark
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m
                                                  WHERE m.id = :id
                                                  ORDER BY m.id ASC'
        )->setParameter('id', $markId);
        $ORMMark = $query->getResult();
        if (empty($ORMMark)) {
            throw new Exception('', ErrorType::NOT_FOUND->value);
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Mark::class, [
            'id' => $ORMMark->getId(),
            'studentId' => $ORMMark->getStudentId(),
            'studentMark' => $ORMMark->getStudentMark(),
        ]);
    }

    public function getMarksByTaskId(int $taskId): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m INNER JOIN App\Om\Infrastructure\Repositories\Entity\TaskMark task_mark
                                                  WHERE task_mark.task_id = :taskId AND task_mark.mark_id = m.id
                                                  ORDER BY m.id ASC'
        )->setParameter('taskId', $taskId);
        $ORMMarks = $query->getResult();
        $marks = [];
        foreach ($ORMMarks as $ORMMark) {
            $hydrator = new Hydrator();
            $marks[] = $hydrator->hydrate(Mark::class, [
                'id' => $ORMMark->getId(),
                'studentId' => $ORMMark->getStudentId(),
                'studentMark' => $ORMMark->getStudentMark(),
            ]);
        }
        return $marks;
    }

    public function getAllMarks(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT m
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Mark m
                                                  ORDER BY m.id ASC'
        );
        $ORMMarks = $query->getResult();
        $marks = [];
        foreach ($ORMMarks as $ORMMark) {
            $hydrator = new Hydrator();
            $marks[] = $hydrator->hydrate(Mark::class, [
                'id' => $ORMMark->getId(),
                'studentId' => $ORMMark->getStudentId(),
                'studentMark' => $ORMMark->getStudentMark(),
            ]);
        }
        return $marks;
    }
}
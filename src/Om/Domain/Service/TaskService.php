<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Task;
use App\Om\Domain\Entity\TaskRepositoryInterface;
use DateTime;

class TaskService
{

    public function __construct(private readonly TaskRepositoryInterface $taskRepository)
    {
    }

    public function createTask(
        string $topic,
        string $description,
        int $maxMark,
    ): Task
    {
       $taskId = $this->taskRepository->takeNewId();
       $task = new Task($taskId, $topic, $description, $maxMark, []);
       $this->taskRepository->store($task);

       return $task;
    }

    public function changeTaskTopic(int $id, string $topic): void
    {
        $task = $this->taskRepository->get($id);
        $task->setTopic($topic);
    }

    public function changeTaskDescription(int $id, string $description): void
    {
        $task = $this->taskRepository->get($id);
        $task->setDescription($description);
    }

    public function changeTaskDate(int $id, DateTime $date): void
    {
        $task = $this->taskRepository->get($id);
        $task->setDate($date);
    }

    public function changeTaskMaxMark(int $id, int $maxMark): void
    {
        $task = $this->taskRepository->get($id);
        $task->setMaxMark($maxMark);
    }

}
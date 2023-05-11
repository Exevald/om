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
    ): int
    {
       $taskId = $this->taskRepository->takeNewId();
       $task = new Task($taskId, $topic, $description, $maxMark, []);
       $this->taskRepository->store($task);

       return $taskId;
    }

    public function changeTaskInitials(int $id, string $topic, string $description): void
    {
        $task = $this->taskRepository->get($id);
        $task->setTopic($topic);
        $task->setDescription($description);
        $this->taskRepository->update($task);
    }

    public function changeTaskDate(int $id, DateTime $date): void
    {
        $task = $this->taskRepository->get($id);
        $task->setDate($date);
        $this->taskRepository->update($task);
    }

    public function changeTaskMaxMark(int $id, int $maxMark): void
    {
        $task = $this->taskRepository->get($id);
        $task->setMaxMark($maxMark);
        $this->taskRepository->update($task);
    }

    public function appendMark(int $id, int $markId): void
    {
        $task = $this->taskRepository->get($id);
        $task->addMark($markId);
        $this->taskRepository->update($task);
    }

    public function deleteMark(int $id, int $markId): void
    {
        $task = $this->taskRepository->get($id);
        $task->deleteMark($markId);
        $this->taskRepository->update($task);
    }

}
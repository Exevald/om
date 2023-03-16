<?php

namespace App\Tests;

use App\Om\Domain\Entity\Task;
use App\Om\Domain\Entity\TaskRepositoryInterface;
use Exception;

class TaskRepository implements TaskRepositoryInterface
{
    public array $tasks = [];

    public function get(int $id): Task
    {
        if (!isset($this->tasks[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        return $this->tasks[$id];
    }

    public function store(Task $task): void
    {
        $this->tasks[] = $task;
    }

    public function delete(int $id): void
    {
        if (!isset($this->tasks[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        unset($this->tasks[$id]);
    }

    public function takeNewId(): int
    {
        return count($this->tasks);
    }
}
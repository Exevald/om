<?php

namespace App\Om\App\Query;

use App\Om\App\Query\Data\Task;

interface TaskQueryServiceInterface
{
    public function getTaskById(int $taskId): Task;

    public function getTaskByTopic(string $taskTopic): Task;

    public function getAllTasks(): array;
}
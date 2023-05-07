<?php

namespace App\Om\App\Query;

use App\Om\App\Query\Data\Mark;

interface MarkQueryServiceInterface
{
    public function getMarkById(int $markId): Mark;

    public function getMarksByTaskId(int $taskId): array;

    public function getAllMarks(): array;

}
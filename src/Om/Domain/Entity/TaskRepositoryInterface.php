<?php

namespace App\Om\Domain\Entity;

interface TaskRepositoryInterface
{
    public function get(int $id): Task;

    public function store(Task $task): void;

    public function update(Task $task): void;

    public function delete(int $id): void;

    public function takeNewId(): int;
}
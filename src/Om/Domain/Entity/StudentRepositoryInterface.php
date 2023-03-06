<?php

namespace App\Om\Domain\Entity;

interface StudentRepositoryInterface
{
    public function get(int $id): Student;

    public function store(Student $student): void;

    public function delete(int $id): void;

    public function takeNewId(): int;
}
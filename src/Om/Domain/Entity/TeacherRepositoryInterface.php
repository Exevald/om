<?php

namespace App\Om\Domain\Entity;

interface TeacherRepositoryInterface
{
    public function get(int $id): Teacher;

    public function store(Teacher $teacher): void;

    public function delete(int $id): void;

    public function takeNewId(): int;
}
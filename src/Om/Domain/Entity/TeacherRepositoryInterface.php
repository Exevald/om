<?php

namespace App\Om\Domain\Entity;

interface TeacherRepositoryInterface
{
    public function createEmailToken(int $teacherId): string;

    public function checkExitedEmail(string $email): bool;

    public function get(int $id): Teacher;

    public function store(Teacher $teacher): void;

    public function update(Teacher $teacher): void;

    public function takeNewId(): int;
}
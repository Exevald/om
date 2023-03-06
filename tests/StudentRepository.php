<?php

namespace App\Tests;

use App\Om\Domain\Entity\Student;
use App\Om\Domain\Entity\StudentRepositoryInterface;
use Exception;

class StudentRepository implements StudentRepositoryInterface
{
    public array $students = [];

    public function get(int $id): Student
    {
        if (!isset($this->students[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        return $this->students[$id];
    }

    public function store(Student $student): void
    {
        $this->students[] = $student;
    }

    public function delete(int $id): void
    {
        if (!isset($this->students[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        unset($this->students[$id]);
    }

    public function takeNewId(): int
    {
        return count($this->students);
    }
}
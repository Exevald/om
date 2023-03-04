<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Student;
use App\Om\Domain\Entity\StudentRepositoryInterface;

class StudentService
{
    public function __construct(private readonly StudentRepositoryInterface $studentRepository)
    {
    }

    public function createStudent(
        string $firstName,
        string $lastName,
        string $patronymic
    ): Student
    {
        $studentId = $this->studentRepository->takeNewId();
        $student = new Student($studentId, $firstName, $lastName, $patronymic);
        $this->studentRepository->store($student);

        return $student;
    }

    public function changeStudentName(int $id, string $firstName, string $lastName, string $patronymic): void
    {
        $student = $this->studentRepository->get($id);
        $student->setName($firstName, $lastName, $patronymic);
    }

}
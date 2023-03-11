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
    ): Student
    {
        $studentId = $this->studentRepository->takeNewId();
        $student = new Student($studentId, $firstName, $lastName);
        $this->studentRepository->store($student);

        return $student;
    }

    public function changeStudentName(int $id, string $firstName, string $lastName): void
    {
        $student = $this->studentRepository->get($id);
        $student->setName($firstName, $lastName);
    }

}
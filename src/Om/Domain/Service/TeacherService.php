<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Teacher;
use App\Om\Domain\Entity\TeacherRepositoryInterface;
use Exception;

class TeacherService
{
    public function __construct(private readonly TeacherRepositoryInterface $teacherRepository)
    {
    }

    public function createTeacher(
        string $firstName,
        string $lastName,
        string $email,
        string $password,
    ): Teacher
    {
        if ($this->teacherRepository->checkExitedEmail($email))
        {
            throw new Exception("This teacher is already exists", );
        }
        $teacherId = $this->teacherRepository->takeNewId();
        $teacher = new Teacher($teacherId, $firstName, $lastName, $email, $password);
        $this->teacherRepository->store($teacher);

        return $teacher;
    }

    public function changeTeacherName(int $teacherId, string $firstName, string $lastName): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setName($firstName, $lastName);
    }

    public function changeTeacherEmail(int $teacherId, string $email): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setEmail($email);
    }

    public function changeTeacherPassword(int $teacherId, string $password): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setPassword($password);
    }
}
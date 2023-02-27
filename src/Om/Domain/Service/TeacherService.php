<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Gender;
use App\Om\Domain\Entity\Teacher;
use App\Om\Domain\Entity\TeacherRepositoryInterface;

class TeacherService
{
    public function __construct(private readonly TeacherRepositoryInterface $teacherRepository)
    {
    }

    public function createTeacher(
        string $firstName,
        string $lastName,
        string $patronymic,
        string $email,
        string $password,
        Gender $gender
    ): Teacher
    {
        $teacherId = $this->teacherRepository->takeNewId();
        $teacher = new Teacher($teacherId, $firstName, $lastName, $patronymic, $email, $password, $gender);
        $this->teacherRepository->store($teacher);

        return $teacher;
    }

    public function changeTeacherName(int $teacherId, string $firstName, string $lastName, string $patronymic): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setName($firstName, $lastName, $patronymic);
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

    public function changeTeacherGender(int $teacherId, Gender $gender): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setGender($gender);
    }
}
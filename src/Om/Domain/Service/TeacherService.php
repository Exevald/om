<?php

namespace App\Om\Domain\Service;

use App\Common\ErrorType;
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
        array  $groupsIdList
    ): Teacher
    {
        if ($this->teacherRepository->checkExitedEmail($email)) {
            throw new Exception("This teacher is already exists", ErrorType::DUPLICATED_EMAIL_ERROR->value);
        }
        $teacherId = $this->teacherRepository->takeNewId();
        $teacher = new Teacher($teacherId, $firstName, $lastName, $email, $password, $groupsIdList);
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
        if ($this->teacherRepository->checkExitedEmail($email)) {
            throw new Exception("This teacher is already exists", ErrorType::DUPLICATED_EMAIL_ERROR->value);
        }
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setEmail($email);
    }

    public function changeTeacherPassword(int $teacherId, string $password): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setPassword($password);
    }

    public function appendGroup(int $teacherId, int $groupId): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->addGroup($groupId);
    }

    public function deleteTeacherGroups(int $teacherId, array $groupsIdList): void
    {
        foreach ($groupsIdList as $groupId) {
            if (!is_int($groupId)) {
                throw new Exception("The groups list is not correct!");
            }
        }
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->deleteGroupsList($groupsIdList);
    }

}
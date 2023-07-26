<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Teacher;
use App\Om\Domain\Entity\TeacherRepositoryInterface;
use App\Om\Domain\ErrorType\ErrorType;
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
    ): int
    {
        if ($this->teacherRepository->checkExitedEmail($email)) {
            throw new Exception("This teacher is already exists", ErrorType::DUPLICATED_EMAIL_ERROR->value);
        }
        $teacherId = $this->teacherRepository->takeNewId();
        $teacher = new Teacher($teacherId, $firstName, $lastName, $email, $password, $groupsIdList);
        $this->teacherRepository->store($teacher);

        return $teacherId;
    }

    public function changeTeacherName(int $teacherId, string $firstName, string $lastName): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setName($firstName, $lastName);
        $this->teacherRepository->update($teacher);
    }

    public function changeTeacherEmail(int $teacherId, string $email): void
    {
        if ($this->teacherRepository->checkExitedEmail($email)) {
            throw new Exception("This teacher is already exists", ErrorType::DUPLICATED_EMAIL_ERROR->value);
        }
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setEmail($email);
        $this->teacherRepository->update($teacher);
    }

    public function changeTeacherPassword(int $teacherId, string $password): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->setPassword($password);
        $this->teacherRepository->update($teacher);
    }

    public function appendGroup(int $teacherId, int $groupId): void
    {
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->addGroup($groupId);
        $this->teacherRepository->update($teacher);
    }

    public function deleteTeacherGroups(int $teacherId, array $groupIdList): void
    {
        foreach ($groupIdList as $groupId) {
            if (!is_int($groupId)) {
                throw new Exception("The groups list is not correct!");
            }
        }
        $teacher = $this->teacherRepository->get($teacherId);
        $teacher->deleteGroupsList($groupIdList);
        $this->teacherRepository->update($teacher);
    }

}
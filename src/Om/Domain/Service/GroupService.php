<?php

namespace App\Om\Domain\Service;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Group;
use App\Om\Domain\Entity\GroupRepositoryInterface;
use Exception;

class GroupService
{
    public function __construct(private readonly GroupRepositoryInterface $groupRepository)
    {
    }

    public function createGroup(
        string $title,
        string $subject,
        array  $studentsIdList,
        array  $tasksIdList,
    ): int
    {
        if ($title === "") {
            throw new Exception("", ErrorType::INVALID_DATA->value);
        }
        foreach ($studentsIdList as $studentId) {
            if (!is_int($studentId)) {
                throw new Exception("The studentsList is not correct!");
            }
        }
        foreach ($tasksIdList as $taskId) {
            if (!is_int($taskId)) {
                throw new Exception("The tasksList is not correct!");
            }
        }
        $groupId = $this->groupRepository->takeNewId();
        $group = new Group($groupId, $title, $subject, $studentsIdList, $tasksIdList);
        $this->groupRepository->store($group);

        return $groupId;
    }

    public function deleteGroup(int $id): void
    {
        $this->groupRepository->delete($id);
    }

    public function changeGroupTitle(int $id, string $title): void
    {
        if ($title === "") {
            throw new Exception("", ErrorType::INVALID_DATA->value);
        }
        $group = $this->groupRepository->get($id);
        $group->setTitle($title);
        $this->groupRepository->update($group);
    }

    public function changeGroupSubject(int $id, string $subject): void
    {
        $group = $this->groupRepository->get($id);
        $group->setSubject($subject);
        $this->groupRepository->update($group);
    }

    public function appendStudentToGroup(int $id, int $studentId): void
    {
        $group = $this->groupRepository->get($id);
        $group->addStudent($studentId);
        $this->groupRepository->update($group);
    }

    public function deleteStudentsFromGroup(int $id, array $studentsIdList): void
    {
        foreach ($studentsIdList as $studentId) {
            if (!is_int($studentId)) {
                throw new Exception("The studentsList is not correct!");
            }
        }
        $group = $this->groupRepository->get($id);
        $group->deleteStudents($studentsIdList);
        $this->groupRepository->update($group);
    }

    public function appendTask(int $id, int $taskId): void
    {
        $group = $this->groupRepository->get($id);
        $group->addTask($taskId);
        $this->groupRepository->update($group);
    }

    public function deleteTasksFromGroup(int $id, array $tasksIdList): void
    {
        foreach ($tasksIdList as $taskId) {
            if (!is_int($taskId)) {
                throw new Exception("The tasksList is not correct!");
            }
        }
        $group = $this->groupRepository->get($id);
        $group->deleteTasks($tasksIdList);
        $this->groupRepository->update($group);
    }

}
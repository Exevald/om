<?php

namespace App\Om\Domain\Service;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Group;
use App\Om\Domain\Entity\GroupRepositoryInterface;
use App\Om\Domain\Entity\StudentRepositoryInterface;
use App\Om\Domain\Entity\TaskRepositoryInterface;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;
use Exception;

class GroupService
{
    public function __construct(
        private readonly GroupRepositoryInterface $groupRepository,
        private readonly StudentRepositoryInterface $studentRepository,
        private readonly TaskRepositoryInterface $taskRepository
    )
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

    public function changeGroupInitials(int $id, string $title, string $subject): void
    {
        if ($title === "" || $subject === "") {
            throw new Exception("", ErrorType::INVALID_DATA->value);
        }
        $group = $this->groupRepository->get($id);
        $group->setTitle($title);
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
        foreach ($studentsIdList as $studentId) {
            $this->studentRepository->delete($studentId);
        }
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
        foreach ($tasksIdList as $taskId) {
            $this->taskRepository->delete($taskId);
        }
        $this->groupRepository->update($group);
    }

}
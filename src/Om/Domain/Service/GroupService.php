<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Group;
use App\Om\Domain\Entity\GroupRepositoryInterface;

class GroupService
{
    public function __construct(private readonly GroupRepositoryInterface $groupRepository)
    {
    }

    public function createGroup(
        string $title,
        string $subject,
        array $studentsIdList
    ): Group
    {
        $groupId = $this->groupRepository->takeNewId();
        $group = new Group($groupId, $title, $subject, $studentsIdList);
        $this->groupRepository->store($group);

        return $group;
    }

    public function changeGroupTitle(int $id, string $title): void
    {
        $group = $this->groupRepository->get($id);
        $group->setTitle($title);
    }

    public function changeGroupSubject(int $id, string $subject): void
    {
        $group = $this->groupRepository->get($id);
        $group->setSubject($subject);
    }

    public function appendStudentToGroup(int $id, int $studentId): void
    {
        $group = $this->groupRepository->get($id);
        $group->addStudent($studentId);
    }

    public function deleteStudentsFromGroup(int $id, array $studentsIdList): void
    {
        $group = $this->groupRepository->get($id);
        $group->deleteStudents($studentsIdList);
    }

}
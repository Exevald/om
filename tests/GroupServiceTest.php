<?php

namespace App\Tests;

use App\Om\Domain\Service\GroupService;
use PHPUnit\Framework\TestCase;

class GroupServiceTest extends TestCase
{
    private const DEFAULT_GROUP_ID = 0;
    private const DEFAULT_STUDENT_ID_1 = 0;
    private const DEFAULT_STUDENT_ID_2 = 1;
    private const DEFAULT_GROUP_TITLE = "11 Grade";
    private const DEFAULT_GROUP_SUBJECT = "Math";
    private const DEFAULT_GROUP_STUDENTS_LIST = [];
    private const CHANGED_GROUP_TITLE = "Army of the Night";
    private const CHANGED_GROUP_SUBJECT = "Music";
    private const STUDENTS_ID_LIST_TO_DELETE = [0, 1];

    public function testCreateGroup(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $this->assertTrue($group != null);
    }

    public function testChangeGroupTitle(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->changeGroupTitle(self::DEFAULT_GROUP_ID, self::CHANGED_GROUP_TITLE);
        $groupTitle = $group->getTitle();
        $this->assertTrue($groupTitle == self::CHANGED_GROUP_TITLE);
    }

    public function testIncorrectChangeGroupTitle(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->changeGroupTitle(self::DEFAULT_GROUP_ID, self::CHANGED_GROUP_TITLE);
        $groupTitle = $group->getTitle();
        $this->assertFalse($groupTitle == self::DEFAULT_GROUP_TITLE);
    }

    public function testChangeGroupSubject(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->changeGroupSubject(self::DEFAULT_GROUP_ID, self::CHANGED_GROUP_SUBJECT);
        $groupSubject = $group->getSubject();
        $this->assertTrue($groupSubject == self::CHANGED_GROUP_SUBJECT);
    }

    public function testIncorrectChangeGroupSubject(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->changeGroupSubject(self::DEFAULT_GROUP_ID, self::CHANGED_GROUP_SUBJECT);
        $groupSubject = $group->getSubject();
        $this->assertFalse($groupSubject == self::DEFAULT_GROUP_SUBJECT);
    }

    public function testAppendStudentToGroup(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->appendStudentToGroup(self::DEFAULT_GROUP_ID, self::DEFAULT_STUDENT_ID_1);
        $groupStudentsIdList = $group->getStudentsIdList();
        $this->assertTrue($groupStudentsIdList == [0]);
    }

    public function testDeleteStudentsFromGroup(): void
    {
        $groupRepository = new GroupRepository();
        $groupService = new GroupService($groupRepository);
        $group = $groupService->createGroup(
            self::DEFAULT_GROUP_TITLE,
            self::DEFAULT_GROUP_SUBJECT,
            self::DEFAULT_GROUP_STUDENTS_LIST
        );
        $groupService->appendStudentToGroup(self::DEFAULT_GROUP_ID, self::DEFAULT_STUDENT_ID_1);
        $groupService->appendStudentToGroup(self::DEFAULT_GROUP_ID, self::DEFAULT_STUDENT_ID_2);
        $groupService->deleteStudentsFromGroup(self::DEFAULT_GROUP_ID, self::STUDENTS_ID_LIST_TO_DELETE);
        $groupStudentsIdList = $group->getStudentsIdList();
        $this->assertTrue($groupStudentsIdList == []);
    }

}

<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedDeleteGroupsCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedDeleteGroupsCommandHandler
{
    private AuthorizerInterface $authorizer;
    private TeacherService $teacherService;
    private GroupService $groupService;

    public function __construct(
        AuthorizerInterface $authorizer,
        TeacherRepository   $teacherRepository,
        GroupRepository     $groupRepository,
        StudentRepository   $studentRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->teacherService = new TeacherService($teacherRepository);
        $this->groupService = new GroupService($groupRepository, $studentRepository);
    }

    public function handle(AuthorizedDeleteGroupsCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $teacherId = $command->getTeacherId();
        $groupIdList = $command->getGroupIdList();

        foreach ($groupIdList as $groupId) {
            $this->groupService->deleteGroup($groupId);
        }
        $this->teacherService->deleteTeacherGroups($teacherId, $groupIdList);
    }

}
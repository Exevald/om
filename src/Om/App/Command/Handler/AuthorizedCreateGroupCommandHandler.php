<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedCreateGroupCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedCreateGroupCommandHandler
{
    private AuthorizerInterface $authorizer;
    private GroupService $groupService;
    private TeacherService $teacherService;

    public function __construct(
        AuthorizerInterface $authorizer,
        GroupRepository     $groupRepository,
        TeacherRepository   $teacherRepository,
        StudentRepository   $studentRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->groupService = new GroupService($groupRepository, $studentRepository);
        $this->teacherService = new TeacherService($teacherRepository);
    }

    public function handle(AuthorizedCreateGroupCommand $command): int
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $teacherId = $command->getTeacherId();
        $title = $command->getTitle();
        $subject = $command->getSubject();

        $groupId = $this->groupService->createGroup($title, $subject, [], []);
        $this->teacherService->appendGroup($teacherId, $groupId);
        return $groupId;
    }

}
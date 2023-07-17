<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeGroupInitialsCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedChangeGroupInitialsCommandHandler
{
    private AuthorizerInterface $authorizer;
    private GroupService $groupService;

    public function __construct(
        AuthorizerInterface $authorizer,
        GroupRepository     $groupRepository,
        StudentRepository   $studentRepository,
        TaskRepository      $taskRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->groupService = new GroupService($groupRepository, $studentRepository, $taskRepository);
    }

    public function handle(AuthorizedChangeGroupInitialsCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $groupId = $command->getGroupId();
        $title = $command->getTitle();
        $subject = $command->getSubject();

        $this->groupService->changeGroupInitials($groupId, $title, $subject);
    }

}
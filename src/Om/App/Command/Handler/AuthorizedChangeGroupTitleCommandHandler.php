<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeGroupTitleCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;

class AuthorizedChangeGroupTitleCommandHandler
{
    private AuthorizerInterface $authorizer;
    private GroupService $groupService;

    public function __construct(
        AuthorizerInterface $authorizer,
        GroupRepository     $groupRepository,
        StudentRepository   $studentRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->groupService = new GroupService($groupRepository, $studentRepository);
    }

    public function handle(AuthorizedChangeGroupTitleCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $groupId = $command->getGroupId();
        $title = $command->getTitle();

        $this->groupService->changeGroupTitle($groupId, $title);
    }

}
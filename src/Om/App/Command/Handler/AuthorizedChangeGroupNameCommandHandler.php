<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeGroupNameCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;

class AuthorizedChangeGroupNameCommandHandler
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

    public function handle(AuthorizedChangeGroupNameCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $groupId = $command->getGroupId();
        $title = $command->getTitle();
        $subject = $command->getSubject();

        $this->groupService->changeGroupName($groupId, $title, $subject);
    }

}
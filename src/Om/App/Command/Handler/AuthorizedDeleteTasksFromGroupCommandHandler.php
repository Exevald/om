<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedDeleteTasksFromGroupCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;

class AuthorizedDeleteTasksFromGroupCommandHandler
{
    private AuthorizerInterface $authorizer;
    private GroupService $groupService;

    public function __construct(
        AuthorizerInterface $authorizer,
        GroupRepository     $groupRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->groupService = new GroupService($groupRepository);
    }

    public function handle(AuthorizedDeleteTasksFromGroupCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $groupId = $command->getGroupId();
        $tasksIdList = $command->getTasksIdList();

        $this->groupService->deleteTasksFromGroup($groupId, $tasksIdList);
    }

}
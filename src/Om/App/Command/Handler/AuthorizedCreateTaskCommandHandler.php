<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedCreateTaskCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Domain\Service\TaskService;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedCreateTaskCommandHandler
{
    private AuthorizerInterface $authorizer;
    private TaskService $taskService;
    private GroupService $groupService;

    public function __construct(
        AuthorizerInterface $authorizer,
        GroupRepository     $groupRepository,
        TaskRepository      $taskRepository,
        StudentRepository   $studentRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->taskService = new TaskService($taskRepository);
        $this->groupService = new GroupService($groupRepository, $studentRepository);
    }

    public function handle(AuthorizedCreateTaskCommand $command): int
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $groupId = $command->getGroupId();
        $topic = $command->getTopic();
        $description = $command->getDescription();
        $maxMark = $command->getMaxMark();

        $taskId = $this->taskService->createTask($topic, $description, $maxMark);
        $this->groupService->appendTask($groupId, $taskId);
        return $taskId;
    }

}
<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTaskMaxMarkCommand;
use App\Om\Domain\Service\TaskService;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedChangeTaskMaxMarkCommandHandler
{
    private AuthorizerInterface $authorizer;
    private TaskService $taskService;

    public function __construct(
        AuthorizerInterface $authorizer,
        TaskRepository      $taskRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->taskService = new TaskService($taskRepository);
    }

    public function handle(AuthorizedChangeTaskMaxMarkCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $taskId = $command->getTaskId();
        $maxMark = $command->getMaxMark();

        $this->taskService->changeTaskMaxMark($taskId, $maxMark);
    }

}
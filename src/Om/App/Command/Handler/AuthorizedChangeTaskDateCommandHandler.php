<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTaskDateCommand;
use App\Om\Domain\Service\TaskService;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedChangeTaskDateCommandHandler
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

    public function handle(AuthorizedChangeTaskDateCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $taskId = $command->getTaskId();
        $date = $command->getDate();

        $this->taskService->changeTaskDate($taskId, $date);
    }

}
<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTaskTopicCommand;
use App\Om\Domain\Service\TaskService;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedChangeTaskTopicCommandHandler
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

    public function handle(AuthorizedChangeTaskTopicCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $taskId = $command->getTaskId();
        $topic = $command->getTopic();

        $this->taskService->changeTaskTopic($taskId, $topic);
    }

}
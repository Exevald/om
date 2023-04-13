<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedCreateMarkCommand;
use App\Om\Domain\Service\MarkService;
use App\Om\Domain\Service\TaskService;
use App\Om\Infrastructure\Repositories\Repository\MarkRepository;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;

class AuthorizedCreateMarkCommandHandler
{
    private AuthorizerInterface $authorizer;
    private MarkService $markService;
    private TaskService $taskService;

    public function __construct(
        AuthorizerInterface $authorizer,
        MarkRepository $markRepository,
        TaskRepository $taskRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->markService = new MarkService($markRepository);
        $this->taskService = new TaskService($taskRepository);
    }

    public function handle(AuthorizedCreateMarkCommand $command): int
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $taskId = $command->getTaskId();
        $studentId = $command->getStudentId();
        $studentMark = $command->getStudentMark();

        $markId = $this->markService->createMark($studentId, $studentMark);
    }

}
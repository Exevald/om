<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTaskStudentMarkCommand;
use App\Om\Domain\Service\MarkService;
use App\Om\Infrastructure\Repositories\Repository\MarkRepository;

class AuthorizedChangeTaskStudentMarkCommandHandler
{
    private AuthorizerInterface $authorizer;
    private MarkService $markService;

    public function __construct(
        AuthorizerInterface $authorizer,
        MarkRepository      $markRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->markService = new MarkService($markRepository);
    }

    public function handle(AuthorizedChangeTaskStudentMarkCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $markId = $command->getMarkId();
        $studentMark = $command->getStudentMark();

        $this->markService->changeStudentMark($markId, $studentMark);
    }

}
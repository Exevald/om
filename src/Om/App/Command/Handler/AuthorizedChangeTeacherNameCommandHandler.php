<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTeacherNameCommand;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedChangeTeacherNameCommandHandler
{
    private AuthorizerInterface $authorizer;
    private TeacherService $teacherService;

    public function __construct(
        AuthorizerInterface $authorizer,
        TeacherRepository $teacherRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->teacherService = new TeacherService($teacherRepository);
    }

    public function handle(AuthorizedChangeTeacherNameCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $teacherId = $command->getTeacherId();
        $firstName = $command->getFirstName();
        $lastName = $command->getLastName();

        $this->teacherService->changeTeacherName($teacherId, $firstName, $lastName);
    }

}
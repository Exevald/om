<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedCreateTeacherCommand;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedCreateTeacherCommandHandler
{
    private TeacherService $teacherService;
    private AuthorizerInterface $authorizer;

    public function __construct(
        AuthorizerInterface $authorizer,
        TeacherRepository   $teacherRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->teacherService = new TeacherService($teacherRepository);
    }

    public function handle(AuthorizedCreateTeacherCommand $command): int
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $firstName = $command->getFirstName();
        $lastName = $command->getLastName();
        $email = $command->getEmail();
        $password = $command->getPassword();

        return $this->teacherService->createTeacher($firstName, $lastName, $email, $password, []);
    }

}
<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeStudentNameCommand;
use App\Om\Domain\Service\StudentService;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;

class AuthorizedChangeStudentNameCommandHandler
{
    private AuthorizerInterface $authorizer;
    private StudentService $studentService;

    public function __construct(
        AuthorizerInterface $authorizer,
        StudentRepository $studentRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->studentService = new StudentService($studentRepository);
    }

    public function handle(AuthorizedChangeStudentNameCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $studentId = $command->getStudentId();
        $firstName = $command->getFirstName();
        $lastName = $command->getLastName();

        $this->studentService->changeStudentName($studentId, $firstName, $lastName);
    }

}
<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeTeacherPasswordCommand;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedChangeTeacherPasswordCommandHandler
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

    public function handle(AuthorizedChangeTeacherPasswordCommand $command): void
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $teacherId = $command->getTeacherId();
        $password = $command->getPassword();

        $this->teacherService->changeTeacherPassword($teacherId, $password);
    }

}
<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Command\AuthorizedCreateTeacherCommand;
use App\Om\Domain\Service\TeacherService;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;

class AuthorizedCreateTeacherCommandHandler
{
    private TeacherService $teacherService;

    public function __construct(
        TeacherRepository   $teacherRepository
    )
    {
        $this->teacherService = new TeacherService($teacherRepository);
    }

    public function handle(AuthorizedCreateTeacherCommand $command): int
    {
        $firstName = $command->getFirstName();
        $lastName = $command->getLastName();
        $email = $command->getEmail();
        $password = $command->getPassword();

        return $this->teacherService->createTeacher($firstName, $lastName, $email, $password, []);
    }

}
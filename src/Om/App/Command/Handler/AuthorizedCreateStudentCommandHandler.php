<?php

namespace App\Om\App\Command\Handler;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedCreateStudentCommand;
use App\Om\Domain\Service\GroupService;
use App\Om\Domain\Service\StudentService;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;

class AuthorizedCreateStudentCommandHandler
{
    private StudentService $studentService;
    private GroupService $groupService;
    private AuthorizerInterface $authorizer;

    public function __construct(
        AuthorizerInterface $authorizer,
        StudentRepository $studentRepository,
        GroupRepository   $groupRepository
    )
    {
        $this->authorizer = $authorizer;
        $this->studentService = new StudentService($studentRepository);
        $this->groupService = new GroupService($groupRepository);
    }

    private function handle(AuthorizedCreateStudentCommand $command): int
    {
        $token = $command->getToken();
        $this->authorizer->validateToken($token);

        $firstName = $command->getFirstName();
        $lastName = $command->getLastName();
        $groupId = $command->getGroupId();

        $studentId = $this->studentService->createStudent($firstName, $lastName);
        $this->groupService->appendStudentToGroup($groupId, $studentId);
        return $studentId;
    }

}
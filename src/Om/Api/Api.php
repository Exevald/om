<?php

namespace App\Om\Api;

use App\Om\App\Auth\AuthorizerInterface;
use App\Om\App\Command\AuthorizedChangeGroupSubjectCommand;
use App\Om\App\Command\AuthorizedChangeGroupTitleCommand;
use App\Om\App\Command\AuthorizedChangeStudentNameCommand;
use App\Om\App\Command\AuthorizedChangeTaskDateCommand;
use App\Om\App\Command\AuthorizedChangeTaskDescriptionCommand;
use App\Om\App\Command\AuthorizedChangeTaskMaxMarkCommand;
use App\Om\App\Command\AuthorizedChangeTaskStudentMarkCommand;
use App\Om\App\Command\AuthorizedChangeTaskTopicCommand;
use App\Om\App\Command\AuthorizedChangeTeacherEmailCommand;
use App\Om\App\Command\AuthorizedChangeTeacherNameCommand;
use App\Om\App\Command\AuthorizedChangeTeacherPasswordCommand;
use App\Om\App\Command\AuthorizedCreateGroupCommand;
use App\Om\App\Command\AuthorizedCreateMarkCommand;
use App\Om\App\Command\AuthorizedCreateStudentCommand;
use App\Om\App\Command\AuthorizedCreateTaskCommand;
use App\Om\App\Command\AuthorizedCreateTeacherCommand;
use App\Om\App\Command\AuthorizedDeleteGroupsCommand;
use App\Om\App\Command\AuthorizedDeleteStudentsFromGroupCommand;
use App\Om\App\Command\AuthorizedDeleteTaskMarkCommand;
use App\Om\App\Command\AuthorizedDeleteTasksFromGroupCommand;
use App\Om\App\Command\Handler\AuthorizedChangeGroupSubjectCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeGroupTitleCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeStudentNameCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTaskDateCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTaskDescriptionCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTaskMaxMarkCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTaskStudentMarkCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTaskTopicCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTeacherEmailCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTeacherNameCommandHandler;
use App\Om\App\Command\Handler\AuthorizedChangeTeacherPasswordCommandHandler;
use App\Om\App\Command\Handler\AuthorizedCreateGroupCommandHandler;
use App\Om\App\Command\Handler\AuthorizedCreateMarkCommandHandler;
use App\Om\App\Command\Handler\AuthorizedCreateStudentCommandHandler;
use App\Om\App\Command\Handler\AuthorizedCreateTaskCommandHandler;
use App\Om\App\Command\Handler\AuthorizedCreateTeacherCommandHandler;
use App\Om\App\Command\Handler\AuthorizedDeleteGroupsCommandHandler;
use App\Om\App\Command\Handler\AuthorizedDeleteStudentsFromGroupCommandHandler;
use App\Om\App\Command\Handler\AuthorizedDeleteTaskMarkCommandHandler;
use App\Om\App\Command\Handler\AuthorizedDeleteTasksFromGroupCommandHandler;
use App\Om\App\Query\Data\Group;
use App\Om\App\Query\Data\Mark;
use App\Om\App\Query\Data\Student;
use App\Om\App\Query\Data\Task;
use App\Om\App\Query\Data\Teacher;
use App\Om\App\Query\GroupQueryServiceInterface;
use App\Om\App\Query\MarkQueryServiceInterface;
use App\Om\App\Query\StudentQueryServiceInterface;
use App\Om\App\Query\TaskQueryServiceInterface;
use App\Om\App\Query\TeacherQueryServiceInterface;
use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use App\Om\Infrastructure\Repositories\Repository\MarkRepository;
use App\Om\Infrastructure\Repositories\Repository\StudentRepository;
use App\Om\Infrastructure\Repositories\Repository\TaskRepository;
use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;

class Api implements ApiInterface
{

    public function __construct(
        private readonly ManagerRegistry              $doctrine,
        private readonly TeacherQueryServiceInterface $teacherQueryService,
        private readonly StudentQueryServiceInterface $studentQueryService,
        private readonly GroupQueryServiceInterface   $groupQueryService,
        private readonly TaskQueryServiceInterface    $taskQueryService,
        private readonly MarkQueryServiceInterface    $markQueryService,
        private readonly AuthorizerInterface          $authorizer,

    )
    {
    }

    public function getTeacherByToken(string $token): Teacher
    {
        return $this->teacherQueryService->getTeacherByToken($token);
    }

    public function getTeacherById(int $teacherId): Teacher
    {
        return $this->teacherQueryService->getTeacherById($teacherId);
    }

    public function getTeacherByEmail(string $email): Teacher
    {
        return $this->teacherQueryService->getTeacherByEmail($email);
    }

    public function getAllTeachers(): array
    {
        return $this->teacherQueryService->getAllTeachers();
    }

    public function getStudentById(int $studentId): Student
    {
        return $this->studentQueryService->getStudentById($studentId);
    }

    public function getStudentsByGroupId(int $groupId): array
    {
        return $this->studentQueryService->getStudentsByGroupId($groupId);
    }

    public function getAllStudents(): array
    {
        return $this->studentQueryService->getAllStudents();
    }

    public function getGroupById(int $groupId): Group
    {
        return $this->groupQueryService->getGroupById($groupId);
    }

    public function getGroupsByTeacherId(int $teacherId): array
    {
        return $this->groupQueryService->getGroupsByTeacherId($teacherId);
    }

    public function getAllGroups(): array
    {
        return $this->groupQueryService->getAllGroups();
    }

    public function getTaskById(int $taskId): Task
    {
        return $this->taskQueryService->getTaskById($taskId);
    }

    public function getTaskByTopic(string $topic): Task
    {
        return $this->taskQueryService->getTaskByTopic($topic);
    }

    public function getTasksByGroupId(int $groupId): array
    {
        return $this->taskQueryService->getTasksByGroupId($groupId);
    }

    public function getAllTasks(): array
    {
        return $this->taskQueryService->getAllTasks();
    }

    public function getMarkById(int $markId): Mark
    {
        return $this->markQueryService->getMarkById($markId);
    }

    public function getMarksByTaskId(int $taskId): array
    {
        return $this->markQueryService->getMarksByTaskId($taskId);
    }

    public function getAllMarks(): array
    {
        return $this->markQueryService->getAllMarks();
    }

    public function login(string $email, string $password): bool
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        return $this->authorizer->login($email, $password);
    }

    public function createTeacher(string $firstName, string $lastName, string $email, string $password): int
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        $handler = new AuthorizedCreateTeacherCommandHandler($teacherRepository);
        return $handler->handle(new AuthorizedCreateTeacherCommand($firstName, $lastName, $email, $password));
    }

    public function createStudent(string $token, string $firstName, string $lastName, int $groupId): int
    {
        $studentRepository = new StudentRepository($this->doctrine);
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedCreateStudentCommandHandler($this->authorizer, $studentRepository, $groupRepository);
        return $handler->handle(new AuthorizedCreateStudentCommand($token, $firstName, $lastName, $groupId));
    }

    public function createGroup(string $token, string $title, string $subject, int $teacherId): int
    {
        $groupRepository = new GroupRepository($this->doctrine);
        $teacherRepository = new TeacherRepository($this->doctrine);
        $handler = new AuthorizedCreateGroupCommandHandler($this->authorizer, $groupRepository, $teacherRepository);
        return $handler->handle(new AuthorizedCreateGroupCommand($token, $teacherId, $title, $subject));
    }

    public function createTask(string $token, string $topic, string $description, int $maxMark, int $groupId): int
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedCreateTaskCommandHandler($this->authorizer, $groupRepository, $taskRepository);
        return $handler->handle(new AuthorizedCreateTaskCommand($token, $groupId, $topic, $description, $maxMark));
    }

    public function createMark(string $token, int $studentId, int $studentMark, int $taskId): int
    {
        $markRepository = new MarkRepository($this->doctrine);
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedCreateMarkCommandHandler($this->authorizer, $markRepository, $taskRepository);
        return $handler->handle(new AuthorizedCreateMarkCommand($token, $taskId, $studentId, $studentMark));
    }

    public function changeTeacherName(string $token, int $teacherId, string $firstName, string $lastName): void
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        $handler = new AuthorizedChangeTeacherNameCommandHandler($this->authorizer, $teacherRepository);
        $handler->handle(new AuthorizedChangeTeacherNameCommand($token, $teacherId, $firstName, $lastName));
    }

    public function changeTeacherEmail(string $token, int $teacherId, string $email): void
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        $handler = new AuthorizedChangeTeacherEmailCommandHandler($this->authorizer, $teacherRepository);
        $handler->handle(new AuthorizedChangeTeacherEmailCommand($token, $teacherId, $email));
    }

    public function changeTeacherPassword(string $token, int $teacherId, string $password): void
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        $handler = new AuthorizedChangeTeacherPasswordCommandHandler($this->authorizer, $teacherRepository);
        $handler->handle(new AuthorizedChangeTeacherPasswordCommand($token, $teacherId, $password));
    }

    public function changeStudentName(string $token, int $studentId, string $firstName, string $lastName): void
    {
        $studentRepository = new StudentRepository($this->doctrine);
        $handler = new AuthorizedChangeStudentNameCommandHandler($this->authorizer, $studentRepository);
        $handler->handle(new AuthorizedChangeStudentNameCommand($token, $studentId, $firstName, $lastName));
    }

    public function changeGroupTitle(string $token, int $groupId, string $title): void
    {
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedChangeGroupTitleCommandHandler($this->authorizer, $groupRepository);
        $handler->handle(new AuthorizedChangeGroupTitleCommand($token, $groupId, $title));
    }

    public function changeGroupSubject(string $token, int $groupId, string $subject): void
    {
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedChangeGroupSubjectCommandHandler($this->authorizer, $groupRepository);
        $handler->handle(new AuthorizedChangeGroupSubjectCommand($token, $groupId, $subject));
    }

    public function changeTaskTopic(string $token, int $taskId, string $topic): void
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedChangeTaskTopicCommandHandler($this->authorizer, $taskRepository);
        $handler->handle(new AuthorizedChangeTaskTopicCommand($token, $taskId, $topic));
    }

    public function changeTaskDescription(string $token, int $taskId, string $description): void
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedChangeTaskDescriptionCommandHandler($this->authorizer, $taskRepository);
        $handler->handle(new AuthorizedChangeTaskDescriptionCommand($token, $taskId, $description));
    }

    public function changeTaskDate(string $token, int $taskId, DateTime $date): void
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedChangeTaskDateCommandHandler($this->authorizer, $taskRepository);
        $handler->handle(new AuthorizedChangeTaskDateCommand($token, $taskId, $date));
    }

    public function changeTaskMaxMark(string $token, int $taskId, int $maxMark): void
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedChangeTaskMaxMarkCommandHandler($this->authorizer, $taskRepository);
        $handler->handle(new AuthorizedChangeTaskMaxMarkCommand($token, $taskId, $maxMark));
    }

    public function changeTaskStudentMark(string $token, int $markId, int $studentMark): void
    {
        $markRepository = new MarkRepository($this->doctrine);
        $handler = new AuthorizedChangeTaskStudentMarkCommandHandler($this->authorizer, $markRepository);
        $handler->handle(new AuthorizedChangeTaskStudentMarkCommand($token, $markId, $studentMark));
    }

    public function deleteGroups(string $token, int $teacherId, array $groupIdList): void
    {
        $teacherRepository = new TeacherRepository($this->doctrine);
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedDeleteGroupsCommandHandler($this->authorizer, $teacherRepository, $groupRepository);
        $handler->handle(new AuthorizedDeleteGroupsCommand($token, $teacherId, $groupIdList));
    }

    public function deleteStudentsFromGroup(string $token, int $groupId, array $studentsIdList): void
    {
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedDeleteStudentsFromGroupCommandHandler($this->authorizer, $groupRepository);
        $handler->handle(new AuthorizedDeleteStudentsFromGroupCommand($token, $groupId, $studentsIdList));
    }

    public function deleteTaskMark(string $token, int $taskId, int $markId): void
    {
        $taskRepository = new TaskRepository($this->doctrine);
        $handler = new AuthorizedDeleteTaskMarkCommandHandler($this->authorizer, $taskRepository);
        $handler->handle(new AuthorizedDeleteTaskMarkCommand($token, $taskId, $markId));
    }

    public function deleteTasksFromGroup(string $token, int $groupId, array $tasksIdList): void
    {
        $groupRepository = new GroupRepository($this->doctrine);
        $handler = new AuthorizedDeleteTasksFromGroupCommandHandler($this->authorizer, $groupRepository);
        $handler->handle(new AuthorizedDeleteTasksFromGroupCommand($token, $groupId, $tasksIdList));
    }
}
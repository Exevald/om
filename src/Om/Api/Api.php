<?php

namespace App\Om\Api;

use App\Om\App\Auth\AuthorizerInterface;
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

    public function createTeacher(string $token, string $firstName, string $lastName, string $email, string $password): int
    {
        // TODO: Implement createTeacher() method.
    }

    public function createStudent(string $token, string $firstName, string $lastName, int $groupId): int
    {
        // TODO: Implement createStudent() method.
    }

    public function createGroup(string $token, string $title, string $subject, int $teacherId): int
    {
        // TODO: Implement createGroup() method.
    }

    public function createTask(string $token, string $topic, string $description, int $maxMark, int $groupId): int
    {
        // TODO: Implement createTask() method.
    }

    public function createMark(string $token, int $studentId, int $studentMark, int $taskId): int
    {
        // TODO: Implement createMark() method.
    }

    public function changeTeacherName(string $token, int $teacherId, string $firstName, string $lastName): void
    {
        // TODO: Implement changeTeacherName() method.
    }

    public function changeTeacherEmail(string $token, int $teacherId, string $email): void
    {
        // TODO: Implement changeTeacherEmail() method.
    }

    public function changeTeacherPassword(string $token, int $teacherId, string $password): void
    {
        // TODO: Implement changeTeacherPassword() method.
    }

    public function changeStudentName(string $token, int $studentId, string $firstName, string $lastName): void
    {
        // TODO: Implement changeStudentName() method.
    }

    public function changeGroupTitle(string $token, int $groupId, string $title): void
    {
        // TODO: Implement changeGroupTitle() method.
    }

    public function changeGroupSubject(string $token, int $groupId, string $subject): void
    {
        // TODO: Implement changeGroupSubject() method.
    }

    public function changeTaskTopic(string $token, int $taskId, string $topic): void
    {
        // TODO: Implement changeTaskTopic() method.
    }

    public function changeTaskDescription(string $token, int $taskId, string $description): void
    {
        // TODO: Implement changeTaskDescription() method.
    }

    public function changeTaskDate(string $token, int $taskId, DateTime $date): void
    {
        // TODO: Implement changeTaskDate() method.
    }

    public function changeTaskMaxMark(string $token, int $taskId, int $maxMark): void
    {
        // TODO: Implement changeTaskMaxMark() method.
    }

    public function changeTaskStudentMark(string $token, int $markId, int $studentMark): void
    {
        // TODO: Implement changeTaskStudentMark() method.
    }

    public function deleteGroups(string $token, int $teacherId, array $groupIdList): void
    {
        // TODO: Implement deleteGroups() method.
    }

    public function deleteStudentsFromGroup(string $token, int $groupId, array $studentsIdList): void
    {
        // TODO: Implement deleteStudentsFromGroup() method.
    }

    public function deleteTaskMark(string $token, int $taskId, int $markId): void
    {
        // TODO: Implement deleteTaskMark() method.
    }

    public function deleteTasksFromGroup(string $token, int $groupId, array $tasksIdList): void
    {
        // TODO: Implement deleteTasksFromGroup() method.
    }
}
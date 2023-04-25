<?php

namespace App\Om\Api;

use App\Om\App\Query\Data\Teacher;
use App\Om\App\Query\Data\Student;
use App\Om\App\Query\Data\Group;
use App\Om\App\Query\Data\Task;
use App\Om\App\Query\Data\Mark;
use DateTime;

interface ApiInterface
{
    public function getTeacherByToken(string $token): Teacher;

    public function getTeacherById(int $teacherId): Teacher;

    public function getTeacherByEmail(string $email): Teacher;

    public function getAllTeachers(): array;

    public function getStudentById(int $studentId): Student;

    public function getStudentsByGroupId(int $groupId): array;

    public function getAllStudents(): array;

    public function getGroupById(int $groupId): Group;

    public function getGroupsByTeacherId(int $teacherId): array;

    public function getAllGroups(): array;

    public function getTaskById(int $taskId): Task;

    public function getTaskByTopic(string $topic): Task;

    public function getTasksByGroupId(int $groupId): array;

    public function getAllTasks(): array;

    public function getMarkById(int $markId): Mark;

    public function getMarksByTaskId(int $taskId): array;

    public function getAllMarks(): array;

    public function login(string $email, string $password): bool;

    public function createTeacher(string $firstName, string $lastName, string $email, string $password): int;

    public function createStudent(string $token, string $firstName, string $lastName, int $groupId): int;

    public function createGroup(string $token, string $title, string $subject, int $teacherId): int;

    public function createTask(string $token, string $topic, string $description, int $maxMark, int $groupId): int;

    public function createMark(string $token, int $studentId, int $studentMark, int $taskId): int;

    public function changeTeacherName(string $token, int $teacherId, string $firstName, string $lastName): void;

    public function changeTeacherEmail(string $token, int $teacherId, string $email): void;

    public function changeTeacherPassword(string $token, int $teacherId, string $password): void;

    public function changeStudentName(string $token, int $studentId, string $firstName, string $lastName): void;

    public function changeGroupTitle(string $token, int $groupId, string $title): void;

    public function changeGroupSubject(string $token, int $groupId, string $subject): void;

    public function changeTaskTopic(string $token, int $taskId, string $topic): void;

    public function changeTaskDescription(string $token, int $taskId, string $description): void;

    public function changeTaskDate(string $token, int $taskId, DateTime $date): void;

    public function changeTaskMaxMark(string $token, int $taskId, int $maxMark): void;

    public function changeTaskStudentMark(string $token, int $markId, int $studentMark): void;

    public function deleteGroups(string $token, int $teacherId, array $groupIdList): void;

    public function deleteStudentsFromGroup(string $token, int $groupId, array $studentsIdList): void;

    public function deleteTaskMark(string $token, int $taskId, int $markId): void;

    public function deleteTasksFromGroup(string $token, int $groupId, array $tasksIdList): void;

}
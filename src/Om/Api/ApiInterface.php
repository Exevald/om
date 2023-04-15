<?php

namespace App\Om\Api;

use App\Om\App\Query\Data\Teacher;
use App\Om\App\Query\Data\Student;
use App\Om\App\Query\Data\Group;
use App\Om\App\Query\Data\Task;
use App\Om\App\Query\Data\Mark;

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

}
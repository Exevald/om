<?php

namespace App\Om\App\Query;

use App\Om\App\Query\Data\Teacher;

interface TeacherQueryServiceInterface
{
    public function getTeacherByToken(string $token): Teacher;

    public function getTeacherById(int $teacherId): Teacher;

    public function getTeacherByEmail(string $email): Teacher;

    public function getAllTeachers(): array;

}
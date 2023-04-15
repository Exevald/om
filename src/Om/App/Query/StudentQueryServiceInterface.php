<?php

namespace App\Om\App\Query;

use App\Om\App\Query\Data\Student;

interface StudentQueryServiceInterface
{
    public function getStudentById(int $studentId): Student;

    public function getStudentsByGroupId(int $groupId): array;

    public function getAllStudents(): array;

}
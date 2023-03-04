<?php

namespace App\Tests;

use App\Om\Domain\Service\StudentService;
use Exception;
use PHPUnit\Framework\TestCase;

class StudentServiceTest extends TestCase
{
    private const DEFAULT_STUDENT_ID = 0;
    private const DEFAULT_STUDENT_FIRST_NAME = "Ivan";
    private const DEFAULT_STUDENT_LAST_NAME = "Ivanov";
    private const DEFAULT_STUDENT_PATRONYMIC = "Ivanovich";

    public function testCreateStudent(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $student = $studentService->createStudent(
            self::DEFAULT_STUDENT_FIRST_NAME,
            self::DEFAULT_STUDENT_LAST_NAME,
            self::DEFAULT_STUDENT_PATRONYMIC
        );
        $this->assertTrue($student != null);
    }
}

<?php

namespace App\Tests;

use App\Om\Domain\Entity\Gender;
use App\Om\Domain\Service\TeacherService;
use PHPUnit\Framework\TestCase;

class TeacherServiceTest extends TestCase
{

    private const DEFAULT_TEACHER_ID = 0;
    private const DEFAULT_TEACHER_FIRST_NAME = "Ivan";
    private const DEFAULT_TEACHER_LAST_NAME = "Ivanov";
    private const DEFAULT_TEACHER_PATRONYMIC = "Ivanovich";
    private const DEFAULT_TEACHER_EMAIL = "ivaiva@gmail.com";
    private const DEFAULT_TEACHER_PASSWORD = "LxilKD9Pbe";

    public function testCreateTeacher(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
          self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_PATRONYMIC,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $this->assertTrue($teacher !== null);
        dump("Test 1 passed");
    }
}

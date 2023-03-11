<?php

namespace App\Tests;

use App\Om\Domain\Service\TeacherService;
use Exception;
use PHPUnit\Framework\TestCase;

class TeacherServiceTest extends TestCase
{

    private const DEFAULT_TEACHER_ID = 0;
    private const DEFAULT_TEACHER_FIRST_NAME = "Ivan";
    private const DEFAULT_TEACHER_LAST_NAME = "Ivanov";
    private const DEFAULT_TEACHER_EMAIL = "ivaiva@gmail.com";
    private const DEFAULT_TEACHER_PASSWORD = "LxilKD9Pbe";
    private const CHANGED_TEACHER_FIRST_NAME = "Daria";
    private const CHANGED_TEACHER_LAST_NAME = "Shikhanova";
    private const CHANGED_TEACHER_EMAIL = "real.dora@gmail.com";
    private const CHANGED_TEACHER_PASSWORD = "Jfej2323J@";
    private const ERROR_TEACHER_FIRST_NAME = "D0ra";
    private const ERROR_TEACHER_LAST_NAME = "Sh1khanova";
    private const ERROR_TEACHER_EMAIL = "1234dora";
    private const ERROR_TEACHER_PASSWORD = "123456";

    public function testCreateTeacher(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $this->assertTrue($teacher !== null);
    }

    public function testErrorCreateTeacher(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $this->expectException(Exception::class);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::ERROR_TEACHER_LAST_NAME,
            self::ERROR_TEACHER_EMAIL,
            self::ERROR_TEACHER_PASSWORD,
        );
    }

    public function testChangeTeacherName(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherName(
            self::DEFAULT_TEACHER_ID,
            self::CHANGED_TEACHER_FIRST_NAME,
            self::CHANGED_TEACHER_LAST_NAME,
        );
        $teacherFirstName = $teacher->getFirstName();
        $teacherLastName = $teacher->getLastName();
        $this->assertTrue(
            $teacherFirstName == self::CHANGED_TEACHER_FIRST_NAME &&
            $teacherLastName == self::CHANGED_TEACHER_LAST_NAME
        );
    }

    public function testIncorrectChangeTeacherName(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherName(
            self::DEFAULT_TEACHER_ID,
            self::CHANGED_TEACHER_FIRST_NAME,
            self::CHANGED_TEACHER_LAST_NAME,
        );
        $teacherFirstName = $teacher->getFirstName();
        $teacherLastName = $teacher->getLastName();
        $this->assertFalse(
            $teacherFirstName == self::DEFAULT_TEACHER_FIRST_NAME &&
            $teacherLastName == self::DEFAULT_TEACHER_LAST_NAME
        );
    }

    public function testErrorChangeTeacherName(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $this->expectException(Exception::class);
        $teacherService->changeTeacherName(
            self::DEFAULT_TEACHER_ID,
            self::ERROR_TEACHER_FIRST_NAME,
            self::ERROR_TEACHER_LAST_NAME,
        );
    }

    public function testChangeTeacherEmail(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherEmail(self::DEFAULT_TEACHER_ID, self::CHANGED_TEACHER_EMAIL);
        $teacherEmail = $teacher->getEmail();
        $this->assertTrue($teacherEmail == self::CHANGED_TEACHER_EMAIL);
    }

    public function testIncorrectChangeTeacherEmail(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherEmail(self::DEFAULT_TEACHER_ID, self::CHANGED_TEACHER_EMAIL);
        $teacherEmail = $teacher->getEmail();
        $this->assertFalse($teacherEmail == self::DEFAULT_TEACHER_EMAIL);
    }

    public function testErrorChangeTeacherEmail(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $this->expectException(Exception::class);
        $teacherService->changeTeacherEmail(self::DEFAULT_TEACHER_ID, self::ERROR_TEACHER_EMAIL);
    }

    public function testChangeTeacherPassword(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherPassword(self::DEFAULT_TEACHER_ID, self::CHANGED_TEACHER_PASSWORD);
        $teacherPassword = $teacher->getPassword();
        $this->assertTrue($teacherPassword == self::CHANGED_TEACHER_PASSWORD);
    }

    public function testIncorrectChangeTeacherPassword(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $teacherService->changeTeacherPassword(self::DEFAULT_TEACHER_ID, self::CHANGED_TEACHER_PASSWORD);
        $teacherPassword = $teacher->getPassword();
        $this->assertFalse($teacherPassword == self::DEFAULT_TEACHER_PASSWORD);
    }

    public function testErrorChangeTeacherPassword(): void
    {
        $teacherRepository = new TeacherRepository();
        $teacherService = new TeacherService($teacherRepository);
        $teacher = $teacherService->createTeacher(
            self::DEFAULT_TEACHER_FIRST_NAME,
            self::DEFAULT_TEACHER_LAST_NAME,
            self::DEFAULT_TEACHER_EMAIL,
            self::DEFAULT_TEACHER_PASSWORD,
        );
        $this->expectException(Exception::class);
        $teacherService->changeTeacherPassword(self::DEFAULT_TEACHER_ID, self::ERROR_TEACHER_PASSWORD);
    }

}
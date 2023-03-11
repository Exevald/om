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
    private const CHANGED_STUDENT_FIRST_NAME = "Vyacheslav";
    private const CHANGED_STUDENT_LAST_NAME = "Butusov";
    private const ERROR_STUDENT_FIRST_NAME = "R0man";
    private const ERROR_STUDENT_LAST_NAME = "H0snull1n";

    public function testCreateStudent(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $student = $studentService->createStudent(
            self::DEFAULT_STUDENT_FIRST_NAME,
            self::DEFAULT_STUDENT_LAST_NAME,
        );
        $this->assertTrue($student != null);
    }

    public function testErrorCreateStudent(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $this->expectException(Exception::class);
        $student = $studentService->createStudent(
            self::ERROR_STUDENT_FIRST_NAME,
            self::ERROR_STUDENT_LAST_NAME,
        );
    }

    public function testChangeStudentName(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $student = $studentService->createStudent(
            self::DEFAULT_STUDENT_FIRST_NAME,
            self::DEFAULT_STUDENT_LAST_NAME,
        );
        $studentService->changeStudentName(
            self::DEFAULT_STUDENT_ID,
            self::CHANGED_STUDENT_FIRST_NAME,
            self::CHANGED_STUDENT_LAST_NAME,
        );
        $studentFirstName = $student->getFirstName();
        $studentLastName = $student->getLastName();
        $this->assertTrue(
            $studentFirstName == self::CHANGED_STUDENT_FIRST_NAME &&
            $studentLastName == self::CHANGED_STUDENT_LAST_NAME
        );
    }

    public function testIncorrectChangeStudentName(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $student = $studentService->createStudent(
            self::DEFAULT_STUDENT_FIRST_NAME,
            self::DEFAULT_STUDENT_LAST_NAME,
        );
        $studentService->changeStudentName(
            self::DEFAULT_STUDENT_ID,
            self::CHANGED_STUDENT_FIRST_NAME,
            self::CHANGED_STUDENT_LAST_NAME,
        );
        $studentFirstName = $student->getFirstName();
        $studentLastName = $student->getLastName();
        $this->assertFalse(
            $studentFirstName == self::DEFAULT_STUDENT_FIRST_NAME &&
            $studentLastName == self::DEFAULT_STUDENT_LAST_NAME
        );
    }

    public function testErrorChangeStudentName(): void
    {
        $studentRepository = new StudentRepository();
        $studentService = new StudentService($studentRepository);
        $student = $studentService->createStudent(
            self::DEFAULT_STUDENT_FIRST_NAME,
            self::DEFAULT_STUDENT_LAST_NAME,
        );
        $this->expectException(Exception::class);
        $studentService->changeStudentName(
            self::DEFAULT_STUDENT_ID,
            self::ERROR_STUDENT_FIRST_NAME,
            self::ERROR_STUDENT_LAST_NAME,
        );
    }

}

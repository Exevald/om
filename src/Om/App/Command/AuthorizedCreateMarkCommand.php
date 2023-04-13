<?php

namespace App\Om\App\Command;

class AuthorizedCreateMarkCommand
{
    private string $token;
    private int $taskId;
    private int $studentId;
    private int $studentMark;

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getStudentId(): int
    {
        return $this->studentId;
    }

    public function getStudentMark(): int
    {
        return $this->studentMark;
    }

}
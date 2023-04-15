<?php

namespace App\Om\App\Command;

class AuthorizedChangeTaskStudentMarkCommand
{
    private string $token;
    private int $markId;
    private int $studentMark;

    public function __construct(
        string $token,
        int    $markId,
        int    $studentMark
    )
    {
        $this->token = $token;
        $this->markId = $markId;
        $this->studentMark = $studentMark;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getMarkId(): int
    {
        return $this->markId;
    }

    public function getStudentMark(): int
    {
        return $this->studentMark;
    }

}
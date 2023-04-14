<?php

namespace App\Om\App\Command;

class AuthorizedChangeTeacherEmailCommand
{
    private string $token;
    private int $teacherId;
    private string $email;

    public function __construct(
        string $token,
        int    $teacherId,
        string $email,
    )
    {
        $this->token = $token;
        $this->teacherId = $teacherId;
        $this->email = $email;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTeacherId(): int
    {
        return $this->teacherId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

}
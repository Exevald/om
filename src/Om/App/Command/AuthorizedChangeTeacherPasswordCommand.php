<?php

namespace App\Om\App\Command;

class AuthorizedChangeTeacherPasswordCommand
{
    private string $token;
    private int $teacherId;
    private string $password;

    public function __construct(
        string $token,
        int $teacherId,
        string $password,
    )
    {
        $this->token = $token;
        $this->teacherId = $teacherId;
        $this->password = $password;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTeacherId(): int
    {
        return $this->teacherId;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

}
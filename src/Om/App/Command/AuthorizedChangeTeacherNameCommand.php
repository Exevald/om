<?php

namespace App\Om\App\Command;

class AuthorizedChangeTeacherNameCommand
{
    private string $token;
    private int $teacherId;
    private string $firstName;
    private string $lastName;

    public function __construct(
        string $token,
        int    $teacherId,
        string $firstName,
        string $lastName,
    )
    {
        $this->token = $token;
        $this->teacherId = $teacherId;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTeacherId(): int
    {
        return $this->teacherId;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

}
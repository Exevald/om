<?php

namespace App\Om\App\Command;

class AuthorizedChangeStudentNameCommand
{
    private string $token;
    private int $studentId;
    private string $firstName;
    private string $lastName;

    public function __construct(
        string $token,
        int    $studentId,
        string $firstName,
        string $lastName
    )
    {
        $this->token = $token;
        $this->studentId = $studentId;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getStudentId(): int
    {
        return $this->studentId;
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
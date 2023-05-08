<?php

namespace App\Om\App\Command;

class AuthorizedCreateStudentCommand
{
    private string $token;
    private string $firstName;
    private string $lastName;
    private int $groupId;

    public function __construct(
        string    $token,
        string $firstName,
        string $lastName,
        int    $groupId,
    )
    {
        $this->token = $token;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->groupId = $groupId;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getGroupId(): int
    {
        return $this->groupId;
    }

}
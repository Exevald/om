<?php

namespace App\Om\App\Command;

class AuthorizedCreateTeacherCommand
{
    private string $token;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $password;

    public function __construct(
        string $token,
        string $firstName,
        string $lastName,
        string $email,
        string $password
    )
    {
        $this->token = $token;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
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

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

}
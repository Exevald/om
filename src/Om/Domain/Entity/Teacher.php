<?php

namespace App\Om\Domain\Entity;

class Teacher
{
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $patronymic;
    private string $email;
    private string $password;

    public function __construct(
        int    $id,
        string $firstName,
        string $lastName,
        string $patronymic,
        string $email,
        string $password,
    )
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->patronymic = $patronymic;
        $this->email = $email;
        $this->password = $password;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getPatronymic(): string
    {
        return $this->patronymic;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setName(string $firstName, string $lastName, string $patronymic): void
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->patronymic = $patronymic;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }
}
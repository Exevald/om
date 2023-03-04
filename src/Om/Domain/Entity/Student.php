<?php

namespace App\Om\Domain\Entity;

class Student
{
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $patronymic;

    public function __construct(
        int    $id,
        string $firstName,
        string $lastName,
        string $patronymic,
    )
    {
        if (DataValidator::checkName($firstName, $lastName, $patronymic)) {
            $this->id = $id;
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->patronymic = $patronymic;
        }
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

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setName(string $firstName, string $lastName, string $patronymic): void
    {
        if (DataValidator::checkName($firstName, $lastName, $patronymic)) {
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->patronymic = $patronymic;
        }
    }

}
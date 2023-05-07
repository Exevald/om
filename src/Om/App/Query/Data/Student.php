<?php

namespace App\Om\App\Query\Data;

class Student
{
    private int $id;
    private string $firstName;
    private string $lastName;

    public function __construct(
        int    $studentId,
        string $firstName,
        string $lastName
    )
    {
        $this->id = $studentId;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
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

}
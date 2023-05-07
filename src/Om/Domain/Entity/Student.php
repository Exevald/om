<?php

namespace App\Om\Domain\Entity;

class Student
{
    private int $id;
    private string $firstName;
    private string $lastName;

    public function __construct(
        int    $id,
        string $firstName,
        string $lastName
    )
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkName($firstName, $lastName);

        $this->id = $id;
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

    public function setName(string $firstName, string $lastName): void
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkName($firstName, $lastName);

        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

}
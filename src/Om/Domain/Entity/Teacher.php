<?php

namespace App\Om\Domain\Entity;

class Teacher
{
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $password;

    public function __construct(
        int    $id,
        string $firstName,
        string $lastName,
        string $email,
        string $password,
    )
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkName($firstName, $lastName);
        $userDataValidator->checkEmail($email);
        $userDataValidator->checkPassword($password);

        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
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

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setName(string $firstName, string $lastName): void
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkName($firstName, $lastName);

        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

    public function setEmail(string $email): void
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkEmail($email);

        $this->email = $email;
    }

    public function setPassword(string $password): void
    {
        $userDataValidator = new UserDataValidator();
        $userDataValidator->checkPassword($password);

        $this->password = $password;
    }
}
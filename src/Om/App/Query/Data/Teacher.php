<?php

namespace App\Om\App\Query\Data;

class Teacher
{
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $password;

    private array $groupIdList;

    public function __construct(
        int    $teacherId,
        string $firstName,
        string $lastName,
        string $email,
        string $password,
        array $groupIdList
    )
    {
        $this->id = $teacherId;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->groupIdList = $groupIdList;
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
    public function getGroupIdList(): array
    {
        return $this->groupIdList;
    }

}
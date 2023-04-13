<?php

namespace App\Om\Domain\Entity;

use Exception;

class Teacher
{
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $password;
    private array $groupIdList;

    public function __construct(
        int    $id,
        string $firstName,
        string $lastName,
        string $email,
        string $password,
        array  $groupIdList
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

    public function addGroup(int $groupId): void
    {
        if (!in_array($groupId, $this->groupIdList)) {
            $this->groupIdList[] = $groupId;
        }
    }

    public function deleteGroupsList(array $groupsIdList): void
    {
        foreach ($groupsIdList as $groupId) {
            if (!isset($groupId)) {
                throw new Exception("Group with id " . $groupId . " does not exist");
            }
        }
        $this->groupIdList = array_diff($this->groupIdList, $groupsIdList);
    }
}
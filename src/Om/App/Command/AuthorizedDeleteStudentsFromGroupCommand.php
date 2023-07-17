<?php

namespace App\Om\App\Command;

class AuthorizedDeleteStudentsFromGroupCommand
{
    private string $token;
    private int $groupId;
    private array $studentIdList;

    public function __construct(
        string $token,
        int    $groupId,
        array  $studentIdList
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->studentIdList = $studentIdList;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getGroupId(): int
    {
        return $this->groupId;
    }

    public function getStudentIdList(): array
    {
        return $this->studentIdList;
    }

}
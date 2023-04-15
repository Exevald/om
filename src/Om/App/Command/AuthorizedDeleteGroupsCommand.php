<?php

namespace App\Om\App\Command;

class AuthorizedDeleteGroupsCommand
{
    private string $token;
    private int $teacherId;
    private array $groupIdList;

    public function __construct(
        string $token,
        int    $teacherId,
        array  $groupIdList
    )
    {
        $this->token = $token;
        $this->teacherId = $teacherId;
        $this->groupIdList = $groupIdList;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTeacherId(): int
    {
        return $this->teacherId;
    }

    public function getGroupIdList(): array
    {
        return $this->groupIdList;
    }

}
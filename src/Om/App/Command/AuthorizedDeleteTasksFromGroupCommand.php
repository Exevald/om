<?php

namespace App\Om\App\Command;

class AuthorizedDeleteTasksFromGroupCommand
{
    private string $token;
    private int $groupId;
    private array $tasksIdList;

    public function __construct(
        string $token,
        int    $groupId,
        array  $tasksIdList
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->tasksIdList = $tasksIdList;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getGroupId(): int
    {
        return $this->groupId;
    }

    public function getTasksIdList(): array
    {
        return $this->tasksIdList;
    }

}
<?php

namespace App\Om\App\Command;

class AuthorizedChangeTaskDescriptionCommand
{
    private string $token;
    private int $taskId;
    private string $description;

    public function __construct(
        string $token,
        int    $taskId,
        string $description
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->description = $description;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

}
<?php

namespace App\Om\App\Command;

class AuthorizedDeleteTaskMarkCommand
{
    private string $token;
    private int $taskId;
    private int $markId;

    public function __construct(
        string $token,
        int    $taskId,
        int    $markId
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->markId = $markId;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getMarkId(): int
    {
        return $this->markId;
    }

}
<?php

namespace App\Om\App\Command;

class AuthorizedChangeTaskMaxMarkCommand
{
    private string $token;
    private int $taskId;
    private int $maxMark;

    public function __construct(
        string $token,
        int    $taskId,
        int    $maxMark
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->maxMark = $maxMark;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getMaxMark(): int
    {
        return $this->maxMark;
    }

}
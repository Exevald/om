<?php

namespace App\Om\App\Command;

class AuthorizedChangeTaskInitialsCommand
{
    private string $token;
    private int $taskId;
    private string $topic;
    private string $description;

    public function __construct(
        string $token,
        int    $taskId,
        string $topic,
        string $description
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->topic = $topic;
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

    public function getTopic(): string
    {
        return $this->topic;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

}
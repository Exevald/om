<?php

namespace App\Om\App\Command;

class AuthorizedChangeTaskTopicCommand
{
    private string $token;
    private int $taskId;
    private string $topic;

    public function __construct(
        string $token,
        int    $taskId,
        string $topic
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->topic = $topic;
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

}
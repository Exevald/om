<?php

namespace App\Om\App\Command;

class AuthorizedCreateTaskCommand
{

    private string $token;
    private int $groupId;
    private string $topic;
    private string $description;
    private int $maxMark;

    public function __construct(
        string $token,
        int $groupId,
        string $topic,
        string $description,
        int    $maxMark,
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->topic = $topic;
        $this->description = $description;
        $this->maxMark = $maxMark;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getGroupId(): int
    {
        return $this->groupId;
    }

    public function getTopic(): string
    {
        return $this->topic;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getMaxMark(): int
    {
        return $this->maxMark;
    }

}
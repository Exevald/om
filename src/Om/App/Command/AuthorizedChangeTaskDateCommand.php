<?php

namespace App\Om\App\Command;

use DateTime;

class AuthorizedChangeTaskDateCommand
{
    private string $token;
    private int $taskId;
    private DateTime $date;

    public function __construct(
        string   $token,
        int      $taskId,
        DateTime $date
    )
    {
        $this->token = $token;
        $this->taskId = $taskId;
        $this->date = $date;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTaskId(): int
    {
        return $this->taskId;
    }

    public function getDate(): DateTime
    {
        return $this->date;
    }

}
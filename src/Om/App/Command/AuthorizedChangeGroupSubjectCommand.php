<?php

namespace App\Om\App\Command;

class AuthorizedChangeGroupSubjectCommand
{
    private string $token;
    private int $groupId;
    private string $subject;

    public function __construct(
        string $token,
        int    $groupId,
        string $subject
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->subject = $subject;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getGroupId(): int
    {
        return $this->groupId;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

}
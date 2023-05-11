<?php

namespace App\Om\App\Command;

class AuthorizedChangeGroupInitialsCommand
{
    private string $token;
    private int $groupId;
    private string $title;
    private string $subject;

    public function __construct(
        string $token,
        int    $groupId,
        string $title,
        string $subject
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->title = $title;
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

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

}
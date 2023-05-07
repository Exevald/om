<?php

namespace App\Om\App\Command;

class AuthorizedChangeGroupTitleCommand
{
    private string $token;
    private int $groupId;
    private string $title;

    public function __construct(
        string $token,
        int    $groupId,
        string $title
    )
    {
        $this->token = $token;
        $this->groupId = $groupId;
        $this->title = $title;
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

}
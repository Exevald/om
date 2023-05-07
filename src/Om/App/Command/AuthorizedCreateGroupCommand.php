<?php

namespace App\Om\App\Command;

class AuthorizedCreateGroupCommand
{
    private string $token;
    private int $teacherId;
    private string $title;
    private string $subject;

    public function __construct(
        string $token,
        int    $teacherId,
        string $title,
        string $subject,
    )
    {
        $this->token = $token;
        $this->teacherId = $teacherId;
        $this->title = $title;
        $this->subject = $subject;
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getTeacherId(): int
    {
        return $this->teacherId;
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
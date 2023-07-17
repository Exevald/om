<?php

namespace App\Om\App\Model;

class AuthToken
{
    private string $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    function getToken(): string
    {
        return $this->token;
    }

}
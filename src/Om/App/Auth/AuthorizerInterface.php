<?php

namespace App\Om\App\Auth;

interface AuthorizerInterface
{
    public function login(string $email, string $password): string;

    public function validateToken(string $token): int;
}
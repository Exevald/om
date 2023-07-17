<?php

namespace App\Om\App\Service\Captcha;

use App\Om\App\Model\AuthToken;
use App\Om\Infrastructure\Repositories\Repository\Authorizer;

class CaptchaStateManager
{
    private Authorizer $authorizer;

    public function __construct($registry)
    {
        $this->authorizer = new Authorizer($registry);
    }

    public function login(string $email, string $password): AuthToken
    {
        return new AuthToken($this->authorizer->login($email, $password));
    }

}
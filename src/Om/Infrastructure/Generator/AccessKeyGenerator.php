<?php

namespace App\Om\Infrastructure\Generator;

use App\Om\App\Service\Generator\AccessKeyGeneratorInterface;

class AccessKeyGenerator implements AccessKeyGeneratorInterface
{
    public function generateAccessKey(): string
    {
        return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
    }
}
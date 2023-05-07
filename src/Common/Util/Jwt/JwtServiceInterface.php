<?php
declare(strict_types=1);

namespace App\Common\Util\Jwt;

interface JwtServiceInterface
{
    public function encode(array $payload, string $secretKey): string;

    public function decode(string $jwt, string $secretKey, bool $ignoreExpiration = false): array;
}
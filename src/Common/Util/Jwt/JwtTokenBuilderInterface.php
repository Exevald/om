<?php
declare(strict_types=1);

namespace App\Common\Util\Jwt;

interface JwtTokenBuilderInterface
{
    public function buildToken(string $securityKey, array $data): string;

    public function parseToken(string $securityKey, string $token, bool $ignoreExpiration = false): array;
}
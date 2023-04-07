<?php
declare(strict_types=1);

namespace App\Framework\Infrastructure\Jwt;

use App\Common\Util\Jwt\JwtServiceInterface;
use App\Common\Util\Jwt\JwtTokenBuilderInterface;

class JwtTokenBuilder implements JwtTokenBuilderInterface
{
    public const DEFAULT_EXPIRES_TIME_SECONDS = 60;

    private JwtServiceInterface $jwtService;
    private int $expiresTimeSecond;

    public function __construct(JwtServiceInterface $jwtService, int $expiresTimeSecond = self::DEFAULT_EXPIRES_TIME_SECONDS)
    {
        $this->jwtService = $jwtService;
        $this->expiresTimeSecond = $expiresTimeSecond;
    }

    /**
     * @param string $securityKey
     * @param array $data
     * @return string
     * @throws \Exception
     */
    public function buildToken(string $securityKey, array $data): string
    {
        $tokenId = base64_encode(random_bytes(32));
        $issuedAt = time();
        $expire = $issuedAt + $this->expiresTimeSecond;
        $data = array_merge($data, [
                'iat' => $issuedAt,
                'jti' => $tokenId,
                'exp' => $expire,
            ]);
        return $this->jwtService->encode($data, $securityKey);
    }

    /**
     * @param string $securityKey
     * @param string $token
     * @param bool $ignoreExpiration
     * @return array
     */
    public function parseToken(string $securityKey, string $token, bool $ignoreExpiration = true): array
    {
        return $this->jwtService->decode($token, $securityKey, $ignoreExpiration);
    }
}
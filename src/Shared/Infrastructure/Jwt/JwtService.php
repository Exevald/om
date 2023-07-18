<?php
declare(strict_types=1);

namespace App\Shared\Infrastructure\Jwt;

use App\Shared\Domain\Jwt\JwtServiceInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService implements JwtServiceInterface
{
    /**
     * @coupling jwt_default_encryption_alg
     */
    public const DEFAULT_ENCRYPTION_ALG = 'HS256';
    public const DEFAULT_LEEWAY_TIME_SECONDS = 60;

    private int $leeway;

    public function __construct(int $leeway = self::DEFAULT_LEEWAY_TIME_SECONDS)
    {
        $this->leeway = $leeway;
    }

    public function encode(array $payload, string $secretKey): string
    {
        return JWT::encode($payload, $secretKey, self::DEFAULT_ENCRYPTION_ALG);
    }

    public function decode(string $jwt, string $secretKey, bool $ignoreExpiration = false): array
    {
        /** Server-side time can differ for University account and JWT Identity Provider, so we set leeway.
         *
         * @see https://stackoverflow.com/questions/40411014/uncaught-exception-firebase-jwt-beforevalidexception-with-message-cannot-hand
         */
        $oldJwtLeeway = JWT::$leeway;
        try
        {
            JWT::$leeway = $ignoreExpiration ? PHP_INT_MAX : $this->leeway;
            return (array) JWT::decode($jwt, new Key($secretKey, self::DEFAULT_ENCRYPTION_ALG), [self::DEFAULT_ENCRYPTION_ALG]);
        }
        finally
        {
            JWT::$leeway = $oldJwtLeeway;
        }
    }
}
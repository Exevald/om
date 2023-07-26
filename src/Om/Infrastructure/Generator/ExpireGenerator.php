<?php

namespace App\Om\Infrastructure\Generator;

class ExpireGenerator
{
    private const COOKIE_LIVE_TIME = 3600 * 24;

    public function generateExpire(bool $rememberMe): int
    {
        return $rememberMe ? 0 : time() + $this::COOKIE_LIVE_TIME;
    }
}
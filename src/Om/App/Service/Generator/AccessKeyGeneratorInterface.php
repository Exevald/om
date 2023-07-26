<?php

namespace App\Om\App\Service\Generator;

interface AccessKeyGeneratorInterface
{
    public static function generateAccessKey(): string;
}
<?php

namespace App\Om\App\Service\Generator;

interface AccessKeyGeneratorInterface
{
    public function generateAccessKey(): string;
}
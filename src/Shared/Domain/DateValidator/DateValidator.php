<?php

namespace App\Shared\Domain\DateValidator;

class DateValidator
{
    public static function validate(string $strDate, string $format = 'Y.m.d'): bool
    {
        $date = \DateTime::createFromFormat($format, $strDate);
        return $date && $date->format($format) === $strDate;
    }
}
<?php

namespace App\Om\Domain\Entity;

use App\Om\Domain\ErrorType\ErrorType;
use Exception;

class UserDataValidator
{
    private const STRING_REGEXPR = "/^[a-zA-ZА-яёЁ]+$/u";
    private const VALIDATE_PASSWORD = "#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$#";

    public function checkName(string $firstName, ?string $lastName): void
    {
        $checkCorrectFirstName = preg_match(self::STRING_REGEXPR, $firstName);
        $checkCorrectLastName = (($lastName === "") || ($lastName === null) || preg_match(self::STRING_REGEXPR, $lastName));
        if (!($checkCorrectFirstName && $checkCorrectLastName)) {
            throw new Exception("Full name is not correct!", ErrorType::INVALID_DATA->value);
        }
    }

    public function checkEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Email is not correct!", ErrorType::INVALID_DATA->value);
        }
    }

    public function checkPassword(string $password): void
    {
        if (!preg_match(self::VALIDATE_PASSWORD, $password)) {
            throw new Exception("Password is not correct!", ErrorType::INVALID_DATA->value);
        }
    }
}
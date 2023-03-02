<?php

namespace App\Om\Domain\Entity;

use Exception;

class DataValidator
{
    public static function checkName(string $firstName, string $lastName, string $patronymic): bool
    {
        if (!(
            preg_match("/^[a-zA-ZА-яёЁ]+$/u", $firstName) &&
            preg_match("/^[a-zA-ZА-яёЁ]+$/u", $lastName) &&
            preg_match("/^[a-zA-ZА-яёЁ]+$/u", $patronymic)
        )) {
            throw new Exception("Full name is not correct!");
        } else {
            return true;
        }
    }

    public static function checkEmail(string $email): bool
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Email is not correct!");
        } else {
            return true;
        }
    }

    public static function checkPassword(string $password): bool
    {
        if (!preg_match("#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$#", $password)) {
            throw new Exception("Password is not correct!");
        } else {
            return true;
        }
    }
}
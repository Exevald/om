<?php

namespace App\Om\Domain\ErrorType;

enum ErrorType: int
{
    case INCORRECT_INPUT_DATA = 0;
    case INVALID_DATA = 1;
    case NOT_FOUND = 2;
    case DUPLICATED_EMAIL_ERROR = 3;
    case UNAUTHORIZED = 4;

}
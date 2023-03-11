<?php

namespace App\Common;

enum ErrorType: int
{
    case INCORRECT_INPUT_DATA = 0;
    case INVALID_DATA = 1;
}
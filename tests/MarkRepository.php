<?php

namespace App\Tests;

use App\Om\Domain\Entity\Mark;
use App\Om\Domain\Entity\MarkRepositoryInterface;
use Exception;

class MarkRepository implements MarkRepositoryInterface
{

    public array $marks = [];

    public function get(int $id): Mark
    {
        if (!isset($this->marks[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        return $this->marks[$id];
    }

    public function store(Mark $mark): void
    {
        $this->marks[] = $mark;
    }

    public function delete(int $id): void
    {
        if (!isset($this->marks[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        unset($this->marks[$id]);
    }

    public function takeNewId(): int
    {
        return count($this->marks);
    }
}
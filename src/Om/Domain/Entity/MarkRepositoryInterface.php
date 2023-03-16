<?php

namespace App\Om\Domain\Entity;

interface MarkRepositoryInterface
{
    public function get(int $id): Mark;

    public function store(Mark $mark): void;

    public function delete(int $id): void;

    public function takeNewId(): int;
}
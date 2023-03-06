<?php

namespace App\Om\Domain\Entity;

interface GroupRepositoryInterface
{
    public function get(int $id): Group;

    public function store(Group $group): void;

    public function delete(int $id): void;

    public function takeNewId(): int;
}
<?php

namespace App\Tests;

use App\Om\Domain\Entity\Group;
use App\Om\Domain\Entity\GroupRepositoryInterface;
use Exception;

class GroupRepository implements GroupRepositoryInterface
{

    public array $groups = [];

    public function get(int $id): Group
    {
        if (!isset($this->groups[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        return $this->groups[$id];
    }

    public function store(Group $group): void
    {
        $this->groups[] = $group;
    }

    public function delete(int $id): void
    {
        if (!isset($this->groups[$id]))
        {
            throw new Exception("Element with current index does not exist");
        }
        unset($this->groups[$id]);
    }

    public function takeNewId(): int
    {
        return count($this->groups);
    }
}
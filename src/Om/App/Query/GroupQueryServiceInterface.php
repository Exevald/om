<?php

namespace App\Om\App\Query;

use App\Om\App\Query\Data\Group;

interface GroupQueryServiceInterface
{
    public function getGroupById(int $groupId): Group;

    public function getGroupByName(string $groupTitle): Group;

    public function getGroupsByTeacherId(int $teacherId): array;

    public function getAllGroups(): array;

}
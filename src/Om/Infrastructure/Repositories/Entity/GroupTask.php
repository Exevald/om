<?php

namespace App\Om\Infrastructure\Repositories\Entity;

use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
class GroupTask
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $group_id = null;

    #[ORM\Id]
    #[ORM\Column]
    private ?int $task_id = null;

    public function getGroupId(): ?int
    {
        return $this->group_id;
    }

    public function setGroupId(int $group_id): self
    {
        $this->group_id = $group_id;

        return $this;
    }

    public function getTaskId(): ?int
    {
        return $this->task_id;
    }

    public function setTaskId(int $task_id): self
    {
        $this->task_id = $task_id;

        return $this;
    }
}

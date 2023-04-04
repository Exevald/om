<?php

namespace App\Om\Infrastructure\Repositories\Entity;

use App\Om\Infrastructure\Repositories\Repository\MarkRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MarkRepository::class)]
class TaskMark
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $task_id = null;

    #[ORM\Id]
    #[ORM\Column]
    private ?int $mark_id = null;

    public function getTaskId(): ?int
    {
        return $this->task_id;
    }

    public function setTaskId(int $task_id): self
    {
        $this->task_id = $task_id;

        return $this;
    }

    public function getMarkId(): ?int
    {
        return $this->mark_id;
    }

    public function setMarkId(int $mark_id): self
    {
        $this->mark_id = $mark_id;

        return $this;
    }
}

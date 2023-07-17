<?php

namespace App\Om\Infrastructure\Repositories\Entity;

use App\Om\Infrastructure\Repositories\Repository\GroupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
class GroupStudent
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $group_id = null;

    #[ORM\Id]
    #[ORM\Column]
    private ?int $student_id = null;

    public function getGroupId(): ?int
    {
        return $this->group_id;
    }

    public function setGroupId(int $group_id): self
    {
        $this->group_id = $group_id;

        return $this;
    }

    public function getStudentId(): ?int
    {
        return $this->student_id;
    }

    public function setStudentId(int $student_id): self
    {
        $this->student_id = $student_id;

        return $this;
    }
}

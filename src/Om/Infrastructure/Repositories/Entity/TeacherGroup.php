<?php

namespace App\Om\Infrastructure\Repositories\Entity;

use App\Om\Infrastructure\Repositories\Repository\TeacherRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeacherRepository::class)]
class TeacherGroup
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $teacher_id = null;

    #[ORM\Id]
    #[ORM\Column]
    private ?int $group_id = null;

    public function getTeacherId(): ?int
    {
        return $this->teacher_id;
    }

    public function setTeacherId(int $teacher_id): self
    {
        $this->teacher_id = $teacher_id;

        return $this;
    }

    public function getGroupId(): ?int
    {
        return $this->group_id;
    }

    public function setGroupId(int $group_id): self
    {
        $this->group_id = $group_id;

        return $this;
    }
}

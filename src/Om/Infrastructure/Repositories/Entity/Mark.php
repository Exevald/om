<?php

namespace App\Om\Infrastructure\Repositories\Entity;

use App\Om\Infrastructure\Repositories\Repository\MarkRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MarkRepository::class)]
class Mark
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $student_id = null;

    #[ORM\Column(nullable: true)]
    private ?int $student_mark = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
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

    public function getStudentMark(): ?int
    {
        return $this->student_mark;
    }

    public function setStudentMark(?int $student_mark): self
    {
        $this->student_mark = $student_mark;

        return $this;
    }
}

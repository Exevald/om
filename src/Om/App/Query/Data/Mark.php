<?php

namespace App\Om\App\Query\Data;

class Mark
{
    private int $id;
    private int $studentId;
    private int $studentMark;

    public function __construct(
        int $id,
        int $studentId,
        int $studentMark
    )
    {
        $this->id = $id;
        $this->studentId = $studentId;
        $this->studentMark = $studentMark;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getStudentId(): int
    {
        return $this->studentId;
    }

    public function getStudentMark(): int
    {
        return $this->studentMark;
    }
}
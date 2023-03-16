<?php

namespace App\Om\Domain\Service;

use App\Om\Domain\Entity\Mark;
use App\Om\Domain\Entity\MarkRepositoryInterface;

class MarkService
{
    public function __construct(private readonly MarkRepositoryInterface $markRepository)
    {
    }

    public function createMark(
        int $studentId,
        int $studentMark
    ): Mark
    {
        $markId = $this->markRepository->takeNewId();
        $mark = new Mark($markId, $studentId, $studentMark);
        $this->markRepository->store($mark);

        return $mark;
    }

    public function changeStudentMark(int $id, int $studentMark): void
    {
        $mark = $this->markRepository->get($id);
        $mark->setStudentMark($studentMark);
    }

}
<?php

namespace App\Om\Domain\Entity;

use Exception;

class Group
{
    private int $id;
    private string $title;
    private string $subject;
    private array $studentsIdList = [];

    public function __construct
    (
        int    $id,
        string $title,
        string $subject,
        array  $studentsIdList,
    )
    {
        $this->id = $id;
        $this->title = $title;
        $this->subject = $subject;
        $this->studentsIdList = $studentsIdList;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function getStudentsIdList(): array
    {
        return $this->studentsIdList;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function addStudent(int $id): void
    {
        $this->studentsIdList[] = $id;
    }

    public function deleteStudents(array $studentsIdListToDelete): void
    {
        foreach ($studentsIdListToDelete as $studentId) {
            if (!in_array($studentId, $this->studentsIdList)) {
                throw new Exception("Element with current id does not exist");
            }
        }
        $this->studentsIdList = array_values(array_diff($this->studentsIdList, $studentsIdListToDelete));
    }

}
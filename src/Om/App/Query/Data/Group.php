<?php

namespace App\Om\App\Query\Data;

class Group
{
    private int $id;
    private string $title;
    private string $subject;
    private array $studentsIdList;
    private array $tasksIdList;

    public function __construct
    (
        int    $id,
        string $title,
        string $subject,
        array  $studentsIdList,
        array  $tasksIdList
    )
    {
        $this->id = $id;
        $this->title = $title;
        $this->subject = $subject;
        $this->studentsIdList = $studentsIdList;
        $this->tasksIdList = $tasksIdList;
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

    public function getTasksIdList(): array
    {
        return $this->tasksIdList;
    }

}
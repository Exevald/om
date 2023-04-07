<?php

namespace App\Om\App\Query\Data;

use DateTime;

class Task
{
    private int $id;
    private string $topic;
    private string $description;
    private DateTime $date;
    private int $maxMark;
    private array $marksList;

    public function __construct(
        int    $id,
        string $topic,
        string $description,
        int    $maxMark,
        array  $marksList
    )
    {
        $this->id = $id;
        $this->topic = $topic;
        $this->description = $description;
        $this->date = new DateTime();
        $this->maxMark = $maxMark;
        $this->marksList = $marksList;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTopic(): string
    {
        return $this->topic;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getDate(): DateTime
    {
        return $this->date;
    }

    public function getMaxMark(): int
    {
        return $this->maxMark;
    }

    public function getMarksList(): array
    {
        return $this->marksList;
    }

}
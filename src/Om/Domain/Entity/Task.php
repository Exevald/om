<?php

namespace App\Om\Domain\Entity;

use DateTime;
use Exception;

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

    public function setTopic(string $topic): void
    {
        $this->topic = $topic;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setDate(DateTime $date): void
    {
        $this->date = $date;
    }

    public function setMaxMark(int $maxMark): void
    {
        $this->maxMark = $maxMark;
    }

    public function addMark(int $markId): void
    {
        if (in_array($markId, $this->marksList)) {
            throw new Exception("Mark with id " . $markId . " is already is a task");
        }
        $this->marksList[] = $markId;
    }

    public function deleteMark(int $markId): void
    {
        if (!in_array($markId, $this->marksList)) {
            throw new Exception("Mark with id " . $markId . " does not exist in this task");
        }
        unset($this->marksList, $markId);
        $this->marksList = array_values($this->marksList);
    }

}
<?php

namespace App\Om\Domain\Entity;

use Exception;

class Group
{
    private int $id;
    private string $title;
    private string $subject;
    private array $studentsIdList = [];
    private array $tasksIdList = [];

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

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function addStudent(int $studentId): void
    {
        if (in_array($studentId, $this->studentsIdList)) {
            throw new Exception("Student with id" . $studentId . " is already in a group!", 420);
        }
        $this->studentsIdList[] = $studentId;
    }

    public function deleteStudents(array $studentsIdListToDelete): void
    {
        foreach ($studentsIdListToDelete as $studentId) {
            if (!in_array($studentId, $this->studentsIdList)) {
                throw new Exception("Element with current id" . $studentId . "does not exist!", 420);
            }
        }
        $this->studentsIdList = array_diff($this->studentsIdList, $studentsIdListToDelete);
    }

    public function addTask(int $taskId): void
    {
        if (in_array($taskId, $this->tasksIdList)) {
            throw new Exception("Task with id" . $taskId . " is already in a group!");
        }
        $this->tasksIdList[] = $taskId;
    }

    public function deleteTasks(array $tasksIdListToDelete): void
    {
        foreach ($tasksIdListToDelete as $taskId) {
            if (!in_array($taskId, $this->tasksIdList)) {
                throw new Exception("Element with current id" . $taskId . "does not exist!", 420);
            }
        }
        $this->tasksIdList = array_diff($this->tasksIdList, $tasksIdListToDelete);
    }

}
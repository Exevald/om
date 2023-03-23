<?php
//
//namespace App\Tests;
//
//use App\Om\Domain\Entity\Teacher;
//use App\Om\Domain\Entity\TeacherRepositoryInterface;
//use Exception;
//
//class TeacherRepository implements TeacherRepositoryInterface
//{
//
//    public array $teachers = [];
//
//    public function get(int $id): Teacher
//    {
//        if (!isset($this->teachers[$id]))
//        {
//            throw new Exception("Element with current index does not exist");
//        }
//        return $this->teachers[$id];
//    }
//
//    public function store(Teacher $teacher): void
//    {
//        $this->teachers[] = $teacher;
//    }
//
//    public function delete(int $id): void
//    {
//        if (!isset($this->teachers[$id]))
//        {
//            throw new Exception("Element with current index does not exist");
//        }
//        unset($this->teachers[$id]);
//    }
//
//    public function takeNewId(): int
//    {
//        return count($this->teachers);
//    }
//}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MarkController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function createMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $studentId = $body["studentId"];
        $studentMark = $body["studentMark"];
        if (empty($taskId) || empty($studentId) || empty($studentMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createMark($token, $studentId, $studentMark, $taskId);
        return new Response();
    }

    public function changeTaskStudentMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $markId = $body["markId"];
        $studentMark = $body["studentMark"];
        if (empty($markId) || empty($studentMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTaskStudentMark($token, $markId, $studentMark);
        return new Response();
    }

    public function deleteMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $markId = $body["markId"];
        if (empty($taskId) || empty($markId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteTaskMark($token, $taskId, $markId);
        return new Response();
    }

}
<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use App\Om\Domain\ErrorType\ErrorType;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $studentId = $body["studentId"];
        $studentMark = $body["studentMark"];
        if (!isset($taskId) || !isset($studentId) || !isset($studentMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createMark($token, $studentId, $studentMark, $taskId);
        return new Response();
    }

    public function changeTaskStudentMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $markId = $body["markId"];
        $studentMark = $body["studentMark"];
        if (!isset($markId) || !isset($studentMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTaskStudentMark($token, $markId, $studentMark);
        return new Response();
    }

    public function deleteMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $markId = $body["markId"];
        if (!isset($taskId) || !isset($markId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteTaskMark($token, $taskId, $markId);
        return new Response();
    }

}
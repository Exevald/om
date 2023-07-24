<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use App\Om\Domain\ErrorType\ErrorType;
use App\Shared\Domain\DateValidator\DateValidator;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class TaskController extends AbstractController
{
    private const dateRegExpr = 'd.m';
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function createTaskApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $topic = $body["topic"];
        $description = $body["description"];
        $maxMark = $body["maxMark"];
        if (!isset($groupId) || !isset($topic) || !isset($description) || !isset($maxMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createTask($token, $topic, $description, $maxMark, $groupId);
        return new Response();
    }

    public function deleteTasksApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $tasksIdList = $body["tasksIdList"];
        if (!isset($groupId) || !isset($tasksIdList)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteTasksFromGroup($token, $groupId, $tasksIdList);
        return new Response();
    }

    public function changeTaskInitialsApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $topic = $body["topic"];
        $description = $body["description"];
        if (!isset($taskId) || !isset($topic) || !isset($description)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTaskInitials($token, $taskId, $topic, $description);
        return new Response();
    }

    public function changeTaskDateApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $strDate = $body["date"];

        if (!isset($taskId) || DateValidator::validate($strDate, self::dateRegExpr) === false) {
            throw new Exception('Введены неправильные данные', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $date = \DateTime::createFromFormat(self::dateRegExpr, $strDate);
        $this->api->changeTaskDate($token, $taskId, $date);
        return new Response();
    }

    public function changeTaskMaxMarkApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $taskId = $body["taskId"];
        $maxMark = $body["maxMark"];
        if (!isset($taskId) || !isset($maxMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTaskMaxMark($token, $taskId, $maxMark);
        return new Response();
    }

    public function getTaskDataByIdApi(Request $request): Response
    {
        $serializer = new Serializer([new ObjectNormalizer()]);

        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $taskId = $request->attributes->get("taskId");
        if (!isset($taskId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $task = $this->api->getTaskById($taskId);
        $responseContent = [
            'taskId' => $task->getId(),
            'taskTopic' => $task->getTopic(),
            'taskDescription' => $task->getDescription(),
            'taskDate' => $task->getDate(),
            'taskMaxMark' => $task->getMaxMark(),
            'taskMarksList' => $serializer->normalize($task->getMarksList())
        ];
        $response = new  Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($responseContent));

        return $response;
    }

}
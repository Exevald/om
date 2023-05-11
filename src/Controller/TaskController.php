<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class TaskController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function createTaskApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $topic = $body["topic"];
        $description = $body["description"];
        $maxMark = $body["maxMark"];
        if (empty($groupId) || empty($topic) || empty($description) || empty($maxMark)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createTask($token, $topic, $description, $maxMark, $groupId);
        return new Response();
    }

    public function deleteTasksApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $tasksIdList = $body["tasksIdList"];
        if (empty($groupId) || empty($tasksIdList)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteTasksFromGroup($token, $groupId, $tasksIdList);
        return new Response();
    }

    public function getTaskDataByIdApi(Request $request): Response
    {
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer([$normalizer]);

        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $taskId = $request->attributes->get("taskId");
        if (empty($taskId)) {
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
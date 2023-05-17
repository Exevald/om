<?php

namespace App\Controller;

use App\Common\ErrorType;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Om\Api\ApiInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MarksTableController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function marksTablePage(): Response
    {
        return $this->render('default.html.twig');
    }

    public function getMarksTablePageApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            $response = $this->redirectToRoute("loginPage");
            $response->send();
        }
        $groupId = $request->attributes->get("groupId");
        if (empty($groupId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $teacher = $this->api->getTeacherByToken($token);
        $returnData = [
            'teacherId' => $teacher->getId(),
            'userFirstName' => $teacher->getFirstName(),
            'userLastName' => $teacher->getLastName(),
            'tasks' => $this->getAllTasks($groupId),
            'marks' => $this->getAllMarks($groupId)
        ];

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($returnData));

        return $response;
    }

    private function getAllTasks(int $groupId): array
    {
        $responseContent = [];
        foreach ($this->api->getTasksByGroupId($groupId) as $task) {
            $responseContent[] = [
                'id' => $task->getId(),
                'topic' => $task->getTopic(),
                'description' => $task->getDescription(),
                'date' => $task->getDate()->format('Y-m-d'),
                'maxMark' => $task->getMaxMark(),
                'marksList' => $task->getMarksList()
            ];
        }
        return $responseContent;
    }

    private function getAllMarks(int $groupId): array
    {
        $responseContent = [];
        foreach ($this->api->getTasksByGroupId($groupId) as $task) {
            $taskId = $task->getId();
            foreach ($this->api->getMarksByTaskId($taskId) as $mark) {
                $responseContent[] = [
                    'id' => $mark->getId(),
                    'studentId' => $mark->getStudentId(),
                    'studentMark' => $mark->getStudentMark()
                ];
            }
        }
        return $responseContent;
    }


}
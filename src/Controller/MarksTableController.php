<?php

namespace App\Controller;

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
        if (empty($token))
        {
            $response = $this->redirectToRoute("loginPage");
            $response->send();
        }
        $teacher = $this->api->getTeacherByToken($token);
        return $this->render('pages/marks_table/marks_table.twig', [
            'teacherId' => $teacher->getId(),
            'userFirstName' => $teacher->getFirstName(),
            'userLastName' => $teacher->getLastName()
        ]);
    }

    private function getAllTasks(int $groupId): array
    {
        $responseContent = [];
        foreach ($this->api->getTasksByGroupId($groupId) as $task) {
            $responseContent[] = [
                'id' => $task->getId(),
                'topic' => $task->getTopic(),
                'description' => $task->getDescription(),
                'date' => $task->getDate(),
                'maxMark' => $task->getMaxMark(),
                'marksIdList' => $task->getMarksList()
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
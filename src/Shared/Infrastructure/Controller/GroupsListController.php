<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupsListController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }
    public function getGroupsListPageApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token))
        {
            $response = $this->redirectToRoute("loginPage");
            $response->send();
        }
        $teacher = $this->api->getTeacherByToken($token);

        $returnData = [
            'teacherId' => $teacher->getId(),
            'userFirstName' => $teacher->getFirstName(),
            'userLastName' => $teacher->getLastName(),
            'groups' => json_encode($this->getAllGroups($teacher->getId()))
        ];

        $response = new Response;
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($returnData));

        return $response;
    }

    private function getAllGroups(int $teacherId): array
    {
        $responseContent = [];
        foreach ($this->api->getGroupsByTeacherId($teacherId) as $group) {
            $groupId = $group->getId();
            $responseContent[] = [
                'id' => $groupId,
                'title' => $group->getTitle(),
                'subject' => $group->getSubject(),
                'students' => $group->getStudentsIdList(),
                'tasks' => $group->getTasksIdList(),
                'url' => $this->generateUrl('editGroupPage', [
                    'groupId' => $groupId
                ])
            ];
        }
        return $responseContent;
    }

}
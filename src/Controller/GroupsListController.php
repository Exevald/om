<?php

namespace App\Controller;

use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use App\Om\App\Query\Data\Teacher;
use Exception;
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

    public function groupsListPage()
    {
        return $this->render('default.html.twig');
    }
    
    public function getGroupsListPageApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token))
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

    private function getTeacherData(Teacher $teacher): array
    {
        return [
            'teacherId' => $teacher->getId(),
            'firstName' => $teacher->getFirstName(),
            'lastName' => $teacher->getLastName(),
            'email' => $teacher->getEmail(),
            'password' => $teacher->getPassword(),
            'groupIdList' => $teacher->getGroupIdList()
        ];
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
<?php

namespace App\Controller;

use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class GroupController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function createGroupApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $title = $body["title"];
        $subject = $body["subject"];
        $teacherId = $body["teacherId"];
        if (empty($title) || empty($subject) || empty($teacherId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createGroup($token, $title, $subject, $teacherId);
        return new Response();
    }

    public function changeGroupNameApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $title = $body["title"];
        $subject = $body["subject"];
        if (empty($groupId) || empty($title) || empty($subject)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeGroupInitials($token, $groupId, $title, $subject);
        return new Response();
    }

    public function deleteGroupsApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $groupIdList = $body["groupIdList"];
        if (empty($teacherId) || empty($groupIdList)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteGroups($token, $teacherId, $groupIdList);
        return new Response();
    }

    public function getGroupDataByIdApi(Request $request): Response
    {
        $normalizer = new ObjectNormalizer();
        $serializer = new Serializer([$normalizer]);

        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $groupId = $request->attributes->get("groupId");
        if (empty($groupId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $group = $this->api->getGroupById($groupId);
        $responseContent = [
            'groupId' => $group->getId(),
            'groupTitle' => $group->getTitle(),
            'groupSubject' => $group->getSubject(),
            'studentsIdList' => $serializer->normalize($group->getStudentsIdList())
        ];

        $response = new Response;
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($responseContent));

        return $response;
    }

}
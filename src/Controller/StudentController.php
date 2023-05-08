<?php

namespace App\Controller;

use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function createStudentApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $firstName = $body["firstName"];
        $lastName = $body["lastName"];
        if (empty($groupId) || empty($firstName) || empty($lastName)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->createStudent($token, $firstName, $lastName, $groupId);
        return new Response();
    }

}
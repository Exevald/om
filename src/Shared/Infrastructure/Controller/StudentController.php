<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use App\Om\Domain\ErrorType\ErrorType;
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
        if (empty($token))
        {
            $response = $this->redirectToRoute("loginPage");
            $response->send();
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

    public function changeStudentNameApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $studentId = $body["studentId"];
        $firstName = $body["firstName"];
        $lastName = $body["lastName"];
        if (empty($studentId) || empty($firstName) || empty($lastName)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeStudentName($token, $studentId, $firstName, $lastName);
        return new Response();
    }

    public function deleteStudentsApi(Request $request): Response
    {
        var_dump("here delete");
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $groupId = $body["groupId"];
        $studentsIdList = $body["studentsIdList"];
        if (empty($groupId) || empty($studentsIdList)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->deleteStudentsFromGroup($token, $groupId, $studentsIdList);
        return new Response();
    }

    public function getStudentDataByIdApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $studentId = $request->attributes->get("studentId");
        if (empty($studentId)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $student = $this->api->getStudentById($studentId);
        $responseContent = [
            'studentId' => $student->getId(),
            'firstName' => $student->getFirstName(),
            'lastName' => $student->getLastName()
        ];
        $response = new Response;
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($responseContent));
        return $response;
    }

}
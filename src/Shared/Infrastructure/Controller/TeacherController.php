<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use App\Om\Domain\ErrorType\ErrorType;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TeacherController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }
    public function authorizeApi(Request $request): Response
    {
        $response = new Response();
        $body = json_decode($request->getContent(), true);
        $email = $body["email"];
        $password = $body["password"];
        if (!isset($email) || !isset($password)) {
            return $response->setStatusCode(401);
        }
        $authToken = $this->api->login($email, $password);
        $response->headers->setCookie(Cookie::create("token", $authToken->getToken()));
        return $response;
    }

    public function logoutApi(): Response
    {
        $response = new Response();
        $response->headers->clearCookie("token");
        return $response;
    }

    public function createTeacherApi(Request $request): Response
    {
        $response = new Response();
        $body = json_decode($request->getContent(), true);
        $firstName = $body["firstName"];
        $lastName = $body["lastName"];
        $email = $body["email"];
        $password = base64_decode($body["encryptedPassword"]);
        $teacherId = $this->api->createTeacher($firstName, $lastName, $email, $password);
        $authToken = $this->api->login($email, $password);
        $response->headers->setCookie(Cookie::create("token", $authToken->getToken()));
        return $response;
    }

    public function changeTeacherNameApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $firstName = $body["firstName"];
        $lastName = $body["lastName"];
        if (!isset($teacherId) || !isset($firstName) || !isset($lastName)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherName($token, $teacherId, $firstName, $lastName);
        return new Response();
    }

    public function changeTeacherEmailApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $email = $body["email"];
        if (!isset($teacherId) || !isset($email)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherEmail($token, $teacherId, $email);
        return new Response();
    }

    public function changeTeacherPasswordApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (!isset($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $password = $body["password"];
        if (!isset($teacherId) || !isset($password)) {
            throw  new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherPassword($token, $teacherId, $password);
        return new Response();
    }

}
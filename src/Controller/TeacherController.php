<?php

namespace App\Controller;

use App\Common\ErrorType;
use App\Om\Api\ApiInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Cookie;

class TeacherController extends AbstractController
{
    public function __construct(
        private readonly ApiInterface $api
    )
    {
    }

    public function titlePage(): Response
    {
        return $this->render('default.html.twig');
    }

    public function loginPage(): Response
    {
        return $this->render('default.html.twig');
    }

    public function onboardingPage(): Response
    {
        return $this->render('default.html.twig');
    }

    public function authorizeApi(Request $request): Response
    {
        $response = new Response();
        $body = json_decode($request->getContent(), true);
        $email = $body["email"];
        $password = $body["password"];
        if (empty($email) || empty($password)) {
            return $response->setStatusCode(401);
        }
        $authToken = $this->api->login($email, $password);
        $response->headers->setCookie(Cookie::create("token", $authToken->getToken()));
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
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $firstName = $body["firstName"];
        $lastName = $body["lastName"];
        if (empty($teacherId) || empty($firstName) || empty($lastName)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherName($token, $teacherId, $firstName, $lastName);
        return new Response();
    }

    public function changeTeacherEmailApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $email = $body["email"];
        if (empty($teacherId) || empty($email)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherEmail($token, $teacherId, $email);
        return new Response();
    }

    public function changeTeacherPasswordApi(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token)) {
            throw new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $body = json_decode($request->getContent(), true);
        $teacherId = $body["teacherId"];
        $password = $body["password"];
        if (empty($teacherId) || empty($password)) {
            throw  new Exception('', ErrorType::INCORRECT_INPUT_DATA->value);
        }
        $this->api->changeTeacherPassword($token, $teacherId, $password);
        return new Response();
    }

}
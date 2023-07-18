<?php

namespace App\Shared\Infrastructure\Controller;

use App\Om\Api\ApiInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EditGroupController extends AbstractController
{
    public function __construct(private readonly ApiInterface $api)
    {
    }

    public function editGroupPage(): Response
    {
        return $this->render('default.html.twig');
    }
    public function getEditGroupPageApi(Request $request): Response
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
            'userEmail' => $teacher->getEmail(),
        ];

        $response = new Response;
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($returnData));

        return $response;
    }


}
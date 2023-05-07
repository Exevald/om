<?php

namespace App\Controller;

use App\Om\Api\ApiInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EditGroupController extends AbstractController
{
    public function __construct(private readonly ApiInterface $api)
    {
    }

    public function editGroupPage(Request $request): Response
    {
        $token = $request->cookies->get("token");
        if (empty($token))
        {
            $response = $this->redirectToRoute("loginPage");
            $response->send();
        }
        $teacher = $this->api->getTeacherByToken($token);
        return $this->render('pages/edit_group/edit_group.twig', [
            'editGroupPageUrl' => $this->generateUrl("editGroupPage"),
            'teacherId' => $teacher->getId(),
            'userFirstName' => $teacher->getFirstName(),
            'userLastName' => $teacher->getLastName(),
            'userEmail' => $teacher->getEmail(),
        ]);
    }


}
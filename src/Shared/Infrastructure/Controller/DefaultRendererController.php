<?php

namespace App\Shared\Infrastructure\Controller;

use Symfony\Component\HttpFoundation\Response;

class DefaultRendererController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    public function defaultRenderer(): Response
    {
        return $this->render('default.html.twig');
    }
}
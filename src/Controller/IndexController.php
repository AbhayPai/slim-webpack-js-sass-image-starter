<?php

namespace App\Controller;

use App\Controller\BaseController;

class IndexController extends BaseController
{
  public function __invoke($request, $response)
  {
    $data = ['pagetitle' => 'Boilerplate for Slim Webpack Js Sass Image Bootsrap 4 | Abhay Pai'];

    return $this->view->render($response, 'index.html.twig', $data);
  }
}

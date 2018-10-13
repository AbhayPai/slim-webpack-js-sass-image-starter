<?php

namespace App\Controller;

// Psr-7 Request and Response interfaces
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Container;

class Base
{
  public function __construct(Container $container)
  {
    $this->container = $container;
    $this->view = $this->container['view'];
  }

  public function __get($name)
  {
    return $this->container->get($name);
  }
}

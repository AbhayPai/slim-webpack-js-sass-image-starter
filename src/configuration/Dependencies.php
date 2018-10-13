<?php

namespace App\Configuration;

class Dependencies
{
  protected $app;

  public function __construct($app)
  {
    $this->app = $app;
    $this->container = $this->app->getContainer();
  }

  public function init()
  {
    // Twig view dependency
    $this->container['view'] = function ($c) {
      $cf = $c->get('settings')['view'];

      $view = new \Slim\Views\Twig($cf['path'], $cf['twig']);

      $view->addExtension(new \Slim\Views\TwigExtension(
        $c->router,
        $c->request->getUri()
      ));

      return $view;
    };

    //Override the default Not Found Handler
    $this->container['notFoundHandler'] = function ($c) {
      return function ($request, $response) use ($c) {
        return $c['response']
          ->withStatus(404)
          ->withHeader('Content-Type', 'text/html')
          ->write('Page not found');
      };
    };

    //Override the default php error Handler
    $this->container['phpErrorHandler'] = function ($c) {
      return function ($request, $response, $e) use ($c) {
        return $c['response']->withStatus(500)
          ->withHeader('Content-Type', 'text/html')
          ->write($e->getMessage());
      };
    };

    //Override the default error Handler
    $this->container['errorHandler'] = function ($c) {
      return function ($request, $response, $e) use ($c) {
        return $c['response']->withStatus(500)
          ->withHeader('Content-Type', 'text/html')
          ->write($e->getMessage());
      };
    };

    return $this->container;
  }
}
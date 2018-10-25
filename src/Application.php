<?php

namespace app;

use app\helpers\GlobalDefinition;
use app\configuration\Settings;
use app\configuration\Dependencies;
use app\configuration\Routes;
use app\configuration\Middleware;

class Application
{
  public function init()
  {
    GlobalDefinition::init();

    $app = new \Slim\App(Settings::init());

    $dependencies = new Dependencies($app);
    $routes = new Routes($app);
    $middleware = new Middleware($app);

    $dependencies->init();
    $routes->init();
    $middleware->init();

    return $app->run();
  }
}

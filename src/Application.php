<?php

namespace app;

use app\configuration\Settings;
use app\configuration\Dependencies;
use app\configuration\Routes;
use app\configuration\Middleware;

class Application
{
  public function init()
  {
    $settings = new Settings();
    $app = new \Slim\App($settings->init());

    $dependencies = new Dependencies($app);
    $dependencies->init();

    $routes = new Routes($app);
    $routes->init();

    $middleware = new Middleware($app);
    $middleware->init();

    return $app->run();
  }
}

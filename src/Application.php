<?php

namespace App;

use App\Configuration\Settings;
use App\Configuration\Dependencies;
use App\Configuration\Routes;
use App\Configuration\Middleware;

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

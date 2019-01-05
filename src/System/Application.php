<?php

namespace App\System;

use App\Utilities\GlobalDefinition;
use App\Configuration\Settings;
use App\Configuration\Dependencies;
use App\Configuration\Routes;
use App\Configuration\Middleware;

class Application
{
    public function init()
    {
        GlobalDefinition::init();

        $app = new \Slim\App(Settings::init());

        $dependencies = new Dependencies($app);
        $routes       = new Routes($app);
        $middleware   = new Middleware($app);

        $dependencies->init();
        $routes->init();
        $middleware->init();

        return $app->run();
    }
}

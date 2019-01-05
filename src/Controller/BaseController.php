<?php

namespace App\Controller;

use Slim\Container;

class BaseController
{
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->view      = $this->container['view'];
    }

    public function __get($name)
    {
        return $this->container->get($name);
    }
}

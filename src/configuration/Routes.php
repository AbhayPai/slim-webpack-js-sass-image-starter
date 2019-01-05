<?php

namespace App\Configuration;
use Symfony\Component\Yaml\Yaml;

class Routes
{
    protected $app;
    private $data;
    private $path;
    private $className;

    public function __construct($app)
    {
        $this->app = $app;
    }

    public function init()
    {
        try {
            foreach (Yaml::parseFIle(YAML_DIR."routes.yaml") as $key => $value) {
                $this->setRoute($value['title'], $key, $value['classname']);
            }

        return;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    private function setRoute($title, $path, $className)
    {
        if (!is_string($title) ||
            !is_string($path)  ||
            !is_string($className)) {
            return;
        }

        return $this->app->get($path, $className)->setName($title);
    }
}

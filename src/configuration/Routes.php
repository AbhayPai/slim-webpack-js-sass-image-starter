<?php

namespace App\Configuration;

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
      $data = [
        [
          'title' => 'Index',
          'route' => '/',
          'classname' => '\App\Controller\Index',
        ],
      ];

      foreach ($data as $path) {
        $this->setRoute($path['title'], $path['route'], $path['classname']);
      }

      return;
    }
    catch (Exception $e)
    {
      return $e->getMessage();
    }
  }

  private function setRoute($title, $path, $className)
  {
    if (!is_string($title) || !is_string($path) || !is_string($className)) {
      return;
    }

    return $this->app->get($path, $className)->setName($title);
  }
}
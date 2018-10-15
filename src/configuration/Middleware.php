<?php

namespace app\configuration;

class Middleware
{
  public function __construct($app)
  {
    $this->app = $app;
    $this->container = $this->app->getContainer();
    $this->settings = $this->container['settings'];
  }

  public function init()
  {
    self::setIframeDeny();
    return;
  }

  public function setIframeDeny()
  {
    $iframing = $this->settings['iframing'] ?? TRUE;

    if ($iframing)
      return;

    return $this->app->add(function ($request, $response, $next) {
      $response = $next($request, $response);
      return $response
        ->withHeader('X-Frame-Options', 'Deny');
    });
  }
}
<?php

namespace app\configuration;

class Settings
{
  const TEMPLATE_DIRECTORY = 'src/templates/';
  const CACHE_TEMPLATE_DIRECTORY = 'cache/templates/';

  public function init()
  {
    return
    [
      'settings' =>
      [
        'displayErrorDetails' => TRUE,
        'debug' => FALSE,
        'view' => [
          'path' => self::TEMPLATE_DIRECTORY,
          'twig' => [
            'cache' => FALSE,
          ],
        ],
        'iframing' => FALSE,
      ],
    ];
  }
}
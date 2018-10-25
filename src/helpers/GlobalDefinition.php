<?php

namespace app\helpers;

class GlobalDefinition
{
  public function init()
  {
    define("YAML_DIR", getcwd() . "/src/yaml/");
    return;
  }
}

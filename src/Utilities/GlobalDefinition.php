<?php

namespace App\Utilities;

class GlobalDefinition
{
    public function init()
    {
        define("YAML_DIR", getcwd()."/src/Configuration/yaml/");
        return;
    }
}

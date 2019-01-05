<?php

namespace App\Configuration;
use Symfony\Component\Yaml\Yaml;

class Settings
{
    public function init()
    {
        return Yaml::parseFIle(YAML_DIR."settings.yaml");
    }
}

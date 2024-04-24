<?php

namespace App\Http\Controllers;

abstract class Controller {
    protected $api_keys = [
        'newsapi' => '',
        'guardian' => '',
    ];
}

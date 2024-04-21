<?php

namespace App\Http\Controllers;

abstract class Controller {
    protected $defined_preferences = [
        'categories' => [ 'business', 'health', 'general' ],
        'authors' => [ 'CNBC', 'BBC', 'Economic Times' ],
        'sources' => [ 'India', 'U.S.A', 'Germany' ],
    ];
}

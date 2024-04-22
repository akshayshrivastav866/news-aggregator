<?php

namespace App\Http\Controllers;

abstract class Controller {
    protected $defined_preferences = [
        'categories' => [ 'business', 'health', 'general', 'science', 'sports' ],
        'authors' => [ 'Javier Lacort', 'Uriel Bederman', 'Simon Cohen' ],
        'sources' => [ 'CNET', 'MacRumors', 'Hipertextual', 'Digital Trends', 'Yahoo Entertainment' ],
    ];

    protected $api_keys = [
        'newsapi' => '',
        'guardian' => '',
    ];
}

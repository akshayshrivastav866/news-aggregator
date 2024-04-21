<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feeds;

class FeedsController extends Controller {
    public function filters() {
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => $this->defined_preferences
        ]);
    }
}

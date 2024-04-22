<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FeedsController;
use App\Http\Controllers\Api\PreferencesController;

// Open Routes.
Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);

// Protected Routes.
Route::group([
  'middleware' => ['auth:sanctum']
], function() {
    // User Profile Routes.
    Route::get( "profile", [UserController::class, "profile"] );
    Route::get( "logout", [UserController::class, "logout"] );
    Route::get( "isTokenValid", [UserController::class, "isTokenValid"] );

    // User Preferences Routes.
    Route::get("getPreferences", [PreferencesController::class, "getPreferences"]);
    Route::post("setPreferences", [PreferencesController::class, "setPreferences"]);

    // Main Feeds Page
    Route::get( "filters", [FeedsController::class, "filters"] );
    Route::get( "getSearchedResults", [FeedsController::class, "getSearchedResults"] );
    Route::get( "getDefaultFeeds", [FeedsController::class, "getDefaultFeeds"] );
});

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserPreferences;
use Illuminate\Support\Facades\Http;

class PreferencesController extends Controller {
    private function defined_preferences () {
        $response = Http::timeout(20)->get('https://newsapi.org/v2/top-headlines/sources', [
            'apiKey' => $this->api_keys['newsapi']
        ]);

        if ( $response->successful() ) {
            foreach ( $response['sources'] as $source ) {
                $categories[] = $source['category'];
                $sources[] = $source['name'];
            }
        }

        return [
            'categories' => array_values(array_unique($categories)),
            'authors' => ['Javier Lacort', 'Uriel Bederman', 'Simon Cohen'],
            'sources' => array_values(array_unique($sources)),
        ];

    }

    public function getPreferences() {
        $data = [];
        // We will check if this user has already set user preference or not
        $userPreferences = UserPreferences::where('user_id', auth()->user()->id)->first();

        // If not data found for current user, i.e user is new and we will send default values.
        if ( ! $userPreferences ) {
            $data = [
                'selected' => [],
                'defined' => $this->defined_preferences(),
            ];
        }

        // If data is found for current user, i.e user is old and we will send previous selected preferences
        if ( ! empty( $userPreferences->preferences ) ) {
            $data = [
                'selected' => $userPreferences->preferences,
                'defined' => $this->defined_preferences(),
            ];
        }

        return response()->json([
            'status' => 200,
            'message' => 'User Preferences!',
            'data' => $data,
        ]);
    }

    public function setPreferences( Request $request ) {
        $userPreferences = UserPreferences::firstOrNew(['user_id' => auth()->user()->id]);
        $userPreferences->preferences = $request->preferences;
        $userPreferences->save();

        return response()->json([
            'status' => 200,
            'message' => 'Preferences Updated!',
            'data' => []
        ]);
    }
}

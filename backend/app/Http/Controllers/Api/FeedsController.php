<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feeds;
use Illuminate\Support\Facades\Http;

class FeedsController extends Controller {
    public function filters() {
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => $this->defined_preferences
        ]);
    }

    public function getSearchedResults( Request $request ) {
        $searchQuery = $request->query('query');

        if ( $searchQuery === null ) {
            return response()->json([
                'status' => 200,
                'message' => 'Please search something to get news!',
                'data' => [],
            ]);
        }

        $responses = Http::pool(function ($pool) use ($searchQuery) {
            $pool->get( 'https://newsapi.org/v2/everything?q=' . $searchQuery . '&pageSize=10&apiKey=' . $this->api_keys['newsapi'] );
            $pool->get( 'https://content.guardianapis.com/search?q=' . $searchQuery . '&show-elements=image&page-size=10&api-key=' . $this->api_keys['guardian'] );
        });

        // We want to send a structured data to FE so that it can easily parse without any additional logic and display data.
        $finalArray = [];

        foreach ($responses as $response) {
            $responseData = $response->json();

            // Logic for news API.
            if (isset($responseData['articles'])) {
                foreach ($responseData['articles'] as $article) {
                    if ($article['title'] !== '[Removed]') {
                        $finalArray[] = [
                            'author' => $article['author'] ?? null,
                            'title' => $article['title'] ?? null,
                            'url' => $article['url'] ?? null,
                            'thumbnail' => $article['urlToImage'] ?? null,
                            'source' => $article['source']['name'] ?? null,
                            'apiSource' => 'newsAPI'
                        ];
                    }
                }
            }

            // Logic for guardian API.
            if (isset($responseData['response']['results'])) {
                foreach ($responseData['response']['results'] as $result) {
                    $finalArray[] = [
                        'author' => null,
                        'title' => $result['webTitle'] ?? null,
                        'url' => $result['webUrl'] ?? null,
                        'thumbnail' => $result['elements'][1]['assets'][0]['file'] ?? $result['elements'][0]['assets'][0]['file'] ?? null,
                        'source' => null,
                        'apiSource' => 'guardian'
                    ];
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Search Results',
            'data' => $finalArray,
            'source' => 'https://newsapi.org/v2/everything?q=' . $searchQuery . '&pageSize=10&apiKey=' . $this->api_keys['newsapi'],
            'source1' => 'https://content.guardianapis.com/search?q=' . $searchQuery . '&show-elements=image&page-size=10&api-key=' . $this->api_keys['guardian']
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function register( Request $request ) {
        // Let's validate params.
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        // Validations passed, let's register user.
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt( $request->password )
        ]);

        // Let's return response to API call.
        return response()->json([
            'status' => true,
            'message' => 'User registered!',
            'data' => []
        ]);
    }

    public function login( Request $request ) {
        // Let's validate params.
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ( empty( $user ) ) {
            return response()->json([
                'status' => false,
                'message' => 'User not found!',
                'data' => []
            ]);
        }

        // Let's check password.
        if ( ! Hash::check( $request->password, $user->password ) ) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Password!',
                'data' => []
            ]);
        }

        // Generate auth token.
        $token = $user->createTOken('mytoken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'User Authenticated!',
            'token' => $token,
            'data' => []
        ]);
    }

    public function profile() {
        return response()->json([
            'status' => true,
            'message' => 'Profile Information Fetched!',
            // 'data' => auth()->user(), // If required all data, uncomment this line.
            'data' => [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email
            ]
        ]);
    }

    public function logout() {
        // auth()->user()->tokens()->delete(); // uncomment this to delete all tokens associated to current user.
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged Out!',
            'data' => []
        ]);
    }
}

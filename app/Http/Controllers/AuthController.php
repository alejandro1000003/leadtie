<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:10',
        ]);
        
        // Return validation errors if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create a new user
        User::create([
            'name' => $request->name,
            'role' => 'user',
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Return success response
        return response()->json([
            'message' => 'User registered successfully',
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:5',
        ]);

        // Return validation errors if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Extract credentials from the request
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user
        if (!$accessToken = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials. Please check your email and password.'], 401);
        }

        $user = Auth::user();

        // Generate a random refresh token
        $refreshToken = Str::random(60);
        $hashedRefreshToken = hash('sha256', $refreshToken); // Store the hashed version

        // Save the hashed refresh token in the database
        $user->update(['refresh_token' => $hashedRefreshToken]);

        // Store the refresh token (unhashed) in a secure HTTPOnly cookie
        $cookie = cookie('refresh_token', $refreshToken, 10080, '/', null, false, true, false, 'Lax');

        // Return the access token and the cookie with the refresh token
        return response()->json(['token' => $accessToken])->withCookie($cookie);
    }

    public function refresh(Request $request)
    {
        // Retrieve the refresh token from the cookie
        $refreshToken = $request->cookie('refresh_token');
        
        if (!$refreshToken) {
            return response()->json(['error' => 'No refresh token provided'], 401);
        }
    
        // Hash the token before searching for it
        $hashedRefreshToken = hash('sha256', $refreshToken);
        $user = User::where('refresh_token', $hashedRefreshToken)->first();
    
        if (!$user) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }
        
        // Generate a new access token
        $newAccessToken = JWTAuth::fromUser($user);
    
        return response()->json(['token' => $newAccessToken]);
    }
    

    public function getUser()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            return response()->json(['user' => $user], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token is invalid or expired'], 401);
        }
    }
    

    public function logout(Request $request)
    {
        // Retrieve the authenticated user
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        // Invalidate the current access token
        JWTAuth::invalidate(JWTAuth::getToken());

        // Remove the refresh token from the database
        $user->update(['refresh_token' => null]);
    
        // Delete the refresh token cookie
        $cookie = Cookie::forget('refresh_token');
    
        return response()->json(['message' => 'Successfully logged out'])->withCookie($cookie);
    }
    
}

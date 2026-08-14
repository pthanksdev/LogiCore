<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'nullable|string',
                'address' => 'nullable|string',
                'company' => 'nullable|string',
                'gst_number' => 'nullable|string',
            ]);

            // Generate unique 10-digit cust_id
            do {
                $custId = (string) random_int(1000000000, 9999999999);
            } while (Customer::where('cust_id', $custId)->exists());

            $user = User::create([
                'name' => $validated['name'],
                'email' => strtolower($validated['email']),
                'password' => Hash::make($validated['password']),
                'role' => 'customer',
                'cust_id' => $custId,
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'company' => $validated['company'] ?? null,
                'gst_number' => $validated['gst_number'] ?? null,
            ]);

            Customer::create([
                'cust_id' => $custId,
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'gst_number' => $user->gst_number,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'cust_id' => $user->cust_id,
                ],
                'token' => $token,
            ], 201);
        } catch (ValidationException $ve) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $ve->errors(),
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Server error during registration: ' . $th->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', strtolower($request->email))->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The provided credentials do not match our records.',
                    'errors' => [
                        'email' => ['The provided credentials are incorrect.']
                    ]
                ], 401);
            }

            try {
                $user->tokens()->delete(); // Clear old tokens
            } catch (\Throwable $e) {
                // Ignore if tokens table is clear
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'cust_id' => $user->cust_id,
                ],
                'token' => $token,
            ]);
        } catch (ValidationException $ve) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $ve->errors(),
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Server error during authentication: ' . $th->getMessage(),
            ], 500);
        }
    }

    public function me(Request $request)
    {
        try {
            $user = $request->user();
            $user->load('customer');

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'cust_id' => $user->cust_id,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'company' => $user->company,
                    'gst_number' => $user->gst_number,
                    'customer' => $user->customer,
                ],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Server error retrieving session: ' . $th->getMessage(),
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user();

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'phone' => 'nullable|string',
                'address' => 'nullable|string',
                'company' => 'nullable|string',
                'gst_number' => 'nullable|string',
            ]);

            $user->update($validated);

            if ($user->customer) {
                $user->customer->update($validated);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully',
                'data' => $user,
            ]);
        } catch (ValidationException $ve) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $ve->errors(),
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Server error updating profile: ' . $th->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if ($request->user() && $request->user()->currentAccessToken()) {
                $request->user()->currentAccessToken()->delete();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully logged out.',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out.',
            ]);
        }
    }
}

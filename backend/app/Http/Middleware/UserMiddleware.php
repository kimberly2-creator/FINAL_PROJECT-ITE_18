<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user is logged in
        if (!auth()->check()) {
            // If not logged in, send them to login
            return response()->json([
                'message' => 'Please login first!',
                'status' => 'error'
            ], 401);
        }

        // If logged in, let them through
        return $next($request);
    }
}
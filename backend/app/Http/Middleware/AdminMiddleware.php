<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user is logged in and is an admin
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            // If not admin, send them away with a message
            return response()->json([
                'message' => 'Sorry, only admins can access this area!',
                'status' => 'error'
            ], 403);
        }

        // If they are admin, let them through
        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Authentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
//        $a = 2;
//
//        if($a === 12) {
//            return Inertia::location(env('APP_URL').'/login');
//        }else {
//            return $next($request);
//        }
        if(!Auth::check()) {
            return Inertia::location(env('APP_URL').'/login');
        }

        return $next($request);
    }
}

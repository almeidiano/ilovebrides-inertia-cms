<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    // laravel doc
    // public function login(Request $request)
    // {
    //     dd('ok');
    //     // $credentials = $request->validate([
    //     //     'email' => ['required', 'email'],
    //     //     'password' => ['required'],
    //     // ]);
    //     // dd($credentials);
    //     // if (Auth::attempt($credentials)) {
    //     //     $request->session()->regenerate();
 
    //     //     // return redirect()->intended('dashboard');
    //     //     return to_route('/');
    //     // }
 
    //     // return back()->withErrors([
    //     //     'email' => 'The provided credentials do not match our records.',
    //     // ])->onlyInput('email');
    // }
    public function index() {
        return Inertia::render('/', [
            'users' => 'sam'
        ]);
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return to_route('home');
        }

        return back()->withErrors([
            'email' => 'Credenciais Incorretas.',
        ])->onlyInput('email');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route('/login');
        // return redirect('/login');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\CMS\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
//    public function showPublicUsers() {
//        try {
//            $users = DB::connection('ilovebrides')->select('select * from users where role = "public"');
//            return Inertia::render('users/Public', ['users' => $users]);
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }
//    }
    public function showPublicUsers() {
        try {
            $sql = DB::connection('ilovebrides_ilovebri')->select('SELECT * FROM users INNER JOIN public ON public.user_id = users.id');
//            $users = User::where('role', 'public')->get();
            return Inertia::render('users/Public', ['users' => $sql]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

//    public function getPublicUsers() {
//        try {
//            $users = DB::connection('ilovebrides')->select('select * from users');
//            return response()->json($users);
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }
//    }
}

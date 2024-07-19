<?php

namespace App\Http\Controllers;

use App\Models\CMS\User;
use Illuminate\Http\Request;
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
            $sql = DB::connection('ilovebrides_ilovebri')->select('SELECT user_id, name, email, district, phone_nr, cartao_vantagens, newsletter, engaged FROM users INNER JOIN public ON public.user_id = users.id WHERE users.role = "Public"');
            return Inertia::render('users/Public', ['users' => $sql]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deletePublicUsers(Request $request) {
        try {
            // Parse the request content
            $list = json_decode($request->getContent(), true);

            if (is_array($list) && !empty($list)) {
                // Use a parameterized query to prevent SQL injection
                DB::connection('ilovebrides_ilovebri')->table('users')->whereIn('id', $list)->delete();

                // Fetch the updated list of users to return (or adjust as necessary)
                $users = DB::connection('ilovebrides_ilovebri')->select('SELECT user_id, name, email, district, phone_nr, cartao_vantagens, newsletter, engaged FROM users INNER JOIN public ON public.user_id = users.id WHERE users.role = "Public"');

                return Inertia::render('users/Public', ['users' => $users]);
            } else {
                return response()->json(['error' => 'Invalid input'], 400);
            }
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

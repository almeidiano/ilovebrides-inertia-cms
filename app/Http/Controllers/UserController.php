<?php

namespace App\Http\Controllers;

use App\Models\CMS\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            $literaryAbilities = DB::connection('ilovebrides_ilovebri')->select('SELECT * FROM literaryabilities');
            $maritalStatus = DB::connection('ilovebrides_ilovebri')->select('SELECT * FROM maritalstatus');
            $brandPlans = DB::connection('ilovebrides_ilovebri')->select('SELECT id, name FROM brandplans');
            $districts = DB::connection('ilovebrides_ilovebri')->select('SELECT name FROM districts');
            $countries = DB::connection('ilovebrides_ilovebri')->select('SELECT countryName, phoneCode FROM countries');
            $sql = DB::connection('ilovebrides_ilovebri')->select('SELECT user_id, name, email, district, phone_nr, cartao_vantagens, newsletter, engaged FROM users INNER JOIN public ON public.user_id = users.id WHERE users.role = "Public"');

            return Inertia::render('users/Public', [
                'users' => $sql,
                'countries' => $countries,
                'districts' => $districts,
                'brandPlans' => $brandPlans,
                'maritalStatus' => $maritalStatus,
                'literaryAbilities' => $literaryAbilities
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createUser(Request $request) {
        try {
            $data = json_decode($request->getContent(), true);

            // Verifique se os valores obrigatórios estão presentes
            $requiredFields = ['name', 'email', 'plan_id', 'marital_status'];

            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || $data[$field] === '') {
                    return response()->json(['error' => "The field $field is required."], 400);
                }
            }

            // Converta a string em data, se fornecida
            if (!empty($data['wedding_date'])) {
                try {
                    $weddingDate = Carbon::createFromFormat('Y-m-d', $data['wedding_date'])->format('Y-m-d');
                } catch (\Exception $e) {
                    return response()->json(['error' => "Invalid date format for wedding_date. Expected format: Y-m-d"], 400);
                }
            } else {
                $weddingDate = null;
            }

            // Insira o usuário na tabela `users`
            $user_id = DB::connection('ilovebrides_ilovebri')->table('users')->insertGetId([
                'name' => $data['name'],
                'username' => $data['username'] ?? null,
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'Public',
                'newsletter' => $data['newsletter'] ?? false,
            ]);

            // Insira os detalhes do usuário na tabela `public`
            DB::connection('ilovebrides_ilovebri')->table('public')->insert([
                'user_id' => $user_id,
                'country' => $data['country'] ?? null,
                'district' => $data['district'] ?? null,
                'locality' => $data['locality'] ?? null,
                'city' => $data['city'] ?? null,
                'postal' => $data['postal'] ?? null,
                'address' => $data['address'] ?? null,
                'engaged' => $data['engaged'] ?? false,
                'wedding_date' => $weddingDate ?? null,
                'wedding_district' => $data['wedding_district'] ?? null,
                'nif' => $data['nif'] ?? null,
                'phone_nr' => $data['phone_nr'] ?? null,
                'cartao_vantagens' => $data['cartao_vantagens'] ?? false,
                'plan_id' => $data['plan_id'],
                'spouse_name' => $data['spouse_name'] ?? null,
                'occupation' => $data['occupation'] ?? null,
                'marital_status' => $data['marital_status'] ?? null,
                'literary_abilities' => $data['literary_abilities'] ?? null,
            ]);

            // Fetch the updated list of users to return (or adjust as necessary)
            $users = DB::connection('ilovebrides_ilovebri')->select('SELECT user_id, name, email, district, phone_nr, cartao_vantagens, newsletter, engaged FROM users INNER JOIN public ON public.user_id = users.id WHERE users.role = "Public"');
            return $this->showPublicUsers();
//            return Inertia::render('users/Public', ['users' => $users]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

//    private function finishPublicUser($user_id, $data) {
//        try {
//            DB::connection('ilovebrides_ilovebri')->table('public')->insert([
//                'user_id' => $user_id,
//                'country' => $data['country'],
//                'district' => $data['district'],
//                'locality' => $data['locality'],
//                'postal' => $data['postal'],
//                'address' => $data['address'],
//                'engaged' => $data['engaged'],
//                'wedding_date' => $data['wedding_date'],
//                'wedding_district' => $data['wedding_district'],
//                'nif' => $data['nif'],
//                'phone_nr' => $data['phone_nr'],
//                'cartao_vantagens' => $data['cartao_vantagens'],
//                'plan_id' => $data['plan_id'],
//                'spouse_name' => $data['spouse_name'],
//                'occupation' => $data['occupation'],
//                'marital_status' => $data['marital_status'],
//                'literary_abilities' => $data['literary_abilities'],
//            ]);
//
//            // Fetch the updated list of users to return (or adjust as necessary)
//            $users = DB::connection('ilovebrides_ilovebri')->select('SELECT user_id, name, email, district, phone_nr, cartao_vantagens, newsletter, engaged FROM users INNER JOIN public ON public.user_id = users.id WHERE users.role = "Public"');
////            return Inertia::render('users/Public', ['users' => $users]);
//            return $this->showPublicUsers();
//        }catch(\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }
//    }

    public function deletePublicUsers(Request $request) {
        try {
            // Parse the request content
            $list = json_decode($request->getContent(), true);

            if (is_array($list) && !empty($list)) {
                // Use a parameterized query to prevent SQL injection
                DB::connection('ilovebrides_ilovebri')->table('users')->whereIn('id', $list)->delete();
                return response()->json(['error' => false]);
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

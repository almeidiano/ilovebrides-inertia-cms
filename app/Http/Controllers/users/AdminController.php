<?php

namespace App\Http\Controllers\users;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct() {
        try {
            $users = DB::table('adminusers')->get();

            return Inertia::render('users/admin/Index', [
                'users' => $users,
                'flash' => session('success')
            ]);
        }Catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

//    public function showAdminUser($id)
//    {
//        try {
//            $user = DB::table('adminusers')->find($id);
//
//            return Inertia::render('users/admin/Edit', [
//                'user' => $user,
//            ]);
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }
//    }

    public function createAdmin(Request $request) {
        try {
            $data = json_decode($request->getContent(), true);

            // Verifique se os valores obrigatórios estão presentes
            $requiredFields = ['name', 'username', 'password', 'email', 'active'];

            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || $data[$field] === '') {
                    return response()->json(['error' => "The field $field is required."], 400);
                }
            }

            // Insira o usuário na tabela `adminusers`
            DB::table('adminusers')->insert([
                'name' => $data['name'],
                'username' => $data['username'] ?? null,
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 1,
                'active' => $data['active'] ?? false,
            ]);

            return redirect()->route('showAdminUsers')->with('success', 'Administrador criado com sucesso!');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateAdmin($id, Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Verifique se os valores obrigatórios estão presentes
            $requiredFields = ['name', 'username', 'email', 'active'];

            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || $data[$field] === '') {
                    return response()->json(['error' => "The field $field is required."], 400);
                }
            }

            // Insira os detalhes do usuário na tabela `adminusers`
            $updateData = [];

            if (!empty($data['name'])) {
                $updateData['name'] = $data['name'];
            }

            if (!empty($data['username'])) {
                $updateData['username'] = $data['username'];
            }

            if (!empty($data['password'])) {
                $updateData['password'] = bcrypt($data['password']);
            }

            if (!empty($data['email'])) {
                $updateData['email'] = $data['email'];
            }

            if (!empty($data['active'])) {
                $updateData['active'] = $data['active'];
            }

            DB::table('adminusers')->where('id', $id)->update($updateData);

            return redirect()->route('showAdminUsers')->with('success', 'Administrador(a) atualizado com sucesso!');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteAdminUsers(Request $request) {
        try {
            // Parse the request content
            $list = json_decode($request->getContent(), true);

            if (is_array($list) && !empty($list)) {
                // Use a parameterized query to prevent SQL injection
                DB::table('adminusers')->whereIn('id', $list)->delete();
                return response()->json(['error' => false]);
            } else {
                return response()->json(['error' => 'Invalid input'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

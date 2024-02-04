<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Trkac;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = null;

        if ($request->role === 'user') {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|in:user',
            ]);
        } elseif ($request->role === 'trkac') {
            $validator = Validator::make($request->all(), [
                'ime' => 'required|string|max:255',
                'prezime' => 'required|string|max:255',
                'datum_rodjenja' => 'required|date',
                'pol' => 'required|in:musko,zensko',
                'email' => 'required|string|email|max:255|unique:trkacs',
                $credentials['password'] = Hash::make($request->password),
                'prijatelj_id' => 'exists:trkacs,id',
                'role' => 'required|in:trkac',
            ]);

            if ($request->has('prijatelj_id')) {
                $validator->sometimes('prijatelj_id', 'exists:trkacs,id', function ($input) {
                    return $input->prijatelj_id !== null;
                });
            }
        } else {
            return response()->json(['Greska pri registraciji!', 'Nepoznata uloga.']);
        }

        if ($validator->fails()) {
            return response()->json(['Greska pri registraciji!', $validator->errors()]);
        }

        $credentials = [
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->role === 'trkac') {
            $credentials['ime'] = $request->ime;
            $credentials['prezime'] = $request->prezime;
            $credentials['datum_rodjenja'] = $request->datum_rodjenja;
            $credentials['pol'] = $request->pol;
            $credentials['password'] = Hash::make($request->password);

            if ($request->has('prijatelj_id')) {
                $credentials['prijatelj_id'] = $request->prijatelj_id;
            }
        } else {
            $credentials['name'] = $request->name;
            $credentials['password'] = Hash::make($request->password);
        }

        if ($request->role === 'user') {
            $user = User::create($credentials);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer']);
        } elseif ($request->role === 'trkac') {
            $trkac = Trkac::create($credentials);
            $token = $trkac->createToken('auth_token')->plainTextToken;

            return response()->json(['data' => $trkac, 'access_token' => $token, 'token_type' => 'Bearer']);
        } else {
            return response()->json(['Greska pri registraciji!', 'Nepoznata uloga.']);
        }
    }
    

    

   




    



    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    $user = User::where('email', $credentials['email'])->first();

    if ($user) {
        
        if (Hash::check($credentials['password'], $user->password)) {
            
            $userType = 'user';
        } else {
            return response()->json(['message' => 'Pogrešna lozinka.'], 404);
        }
    } else {
        
        $trkac = Trkac::where('email', $credentials['email'])->first();
        if ($trkac && Hash::check($credentials['password'], $trkac->password)) {
            
            $userType = 'trkac';
            $user = $trkac; 
        } else {
            return response()->json(['message' => 'Pogrešna email adresa ili lozinka.'], 404);
        }
    }

    
    $role = $user->role;
    if (!$role) {
        return response()->json(['message' => 'Korisnik nema definisanu ulogu.'], 404);
    }

    

    $token = $user->createToken('auth_token')->plainTextToken;

    $response = [
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
        'role' => $role, 
    ];

    return response()->json($response, 201);
}









public function logout(Request $request)
{
    
    $user = $request->user();

    if ($user->role === 'user' || $user->role === 'trkac') {
        $user->tokens()->delete();
        return ['message' => 'Odjava. Uspesno obrisan token!'];
    } else {
        return response()->json(['message' => 'Nepoznata uloga.']);
    }
}

    
}

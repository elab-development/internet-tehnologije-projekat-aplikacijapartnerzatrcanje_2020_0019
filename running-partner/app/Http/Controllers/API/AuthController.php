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
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'datum_rodjenja' => 'required|date',
            'pol' => 'required|in:musko,zensko',
            'mesto' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:trkacs',
            'password' => 'required|string|min:8',
            'prijatelj_id' => 'exists:trkacs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri registraciji!', $validator->errors()]);
        }

        $credentials = [
            'email' => $request->email,
            'role' => 'trkac',
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'datum_rodjenja' => $request->datum_rodjenja,
            'pol' => $request->pol,
            'mesto' => $request->mesto,
            'password' => Hash::make($request->password),
        ];

        if ($request->has('prijatelj_id')) {
            $credentials['prijatelj_id'] = $request->prijatelj_id;
        }

        $trkac = Trkac::create($credentials);
        $token = $trkac->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $trkac, 'access_token' => $token, 'token_type' => 'Bearer']);
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

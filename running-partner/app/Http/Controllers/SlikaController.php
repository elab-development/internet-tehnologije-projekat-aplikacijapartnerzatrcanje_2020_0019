<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trkac;
use Illuminate\Support\Facades\Storage;

class SlikaController extends Controller
{
    public function uploadSlike(Request $request, $id)
    {

        $request->validate([
            'slika' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $trkac = Trkac::findOrFail($id);


        $slika = $request->file('slika');

        $putanja = $slika->store('public/slike');


        if (Storage::exists($putanja)) {
            $trkac->slika = $putanja;
            $trkac->save();

            return response()->json(['poruka' => 'Slika profila je uspešno uploadovana'], 201);
        } else {
            return response()->json(['poruka' => 'Došlo je do greške prilikom čuvanja slike.'], 500);
        }
    }

}

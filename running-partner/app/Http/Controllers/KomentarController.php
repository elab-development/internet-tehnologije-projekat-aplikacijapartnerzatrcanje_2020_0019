<?php

namespace App\Http\Controllers;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class KomentarController extends Controller
{
    public function index()
    {
        $komentari = Komentar::all();

        return KomentarResource::collection($komentari);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tekst' => 'required|string',
            'trkac_id' => 'required|integer',
            'plan_trke_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri validaciji!', $validator->errors()]);
        }

        $komentar = Komentar::create([
            'tekst' => $request->tekst,
            'trkac_id' => $request->trkac_id,
            'plan_trke_id' => $request->plan_trke_id,
        ]);

        return response()->json(['Komentar je dodat!', new KomentarResource($komentar)]);
    }



    public function destroy($id)
    {
        $komentar = Komentar::find($id);

        if ($komentar) {
            $komentar->delete();
            return response()->json(['Uspesno ste obrisali komentar iz baze podataka!', new KomentarResource($komentar)]);
        } else {
            return response()->json('Komentar koji zelite da obrisete ne postoji u bazi podataka!');
        }
    }

}

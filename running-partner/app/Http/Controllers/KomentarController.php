<?php

namespace App\Http\Controllers;

use App\Http\Resources\KomentarResource;
use App\Models\Komentar;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class KomentarController extends Controller
{
    public function index(Request $request)
    {

        $query = Komentar::query();

        if ($request->has('trkac_id')) {
            $query->where('trkac_id', $request->trkac_id);
        }

        $komentari = $query->with(['trkac', 'planTrke'])->paginate(10);

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

    public function show($id)
    {
        $komentar = Komentar::with(['trkac', 'planTrke'])->find($id);

        if ($komentar) {
            return new KomentarResource($komentar);
        } else {
            return response()->json('Komentar koji želite da nađete ne postoji u bazi podataka!');
        }
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



    public function getKomentariOnPlanTrke($planTrkeId)
    {
        $komentari = Komentar::where('plan_trke_id', $planTrkeId)->get();
        return response()->json(['data' => KomentarResource::collection($komentari)]);
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StatistikaTrke;
use App\Http\Resources\StatistikaTrkeResource;
use Illuminate\Support\Facades\Validator;

class StatistikaTrkeController extends Controller
{


    public function index(Request $request)
    {

        $query = StatistikaTrke::query();

        
    if ($request->has('trkac_id')) {
        $query->where('trkac_id', $request->trkac_id);
    }

    // Filtriranje po plan_trke_id
    if ($request->has('plan_trke_id')) {
        $query->where('plan_trke_id', $request->plan_trke_id);
    }

    if ($request->has('ukupno_vreme')) {
        $query->where('ukupno_vreme', '>', $request->ukupno_vreme);
    }

    // Paginacija
    $statistikeTrke = $query->paginate(10);

    return StatistikaTrkeResource::collection($statistikeTrke);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ukupno_vreme' => 'required|integer',
            'predjeni_km' => 'required|numeric',
            'trkac_id' => 'required|exists:trkacs,id',
            'plan_trke_id' => 'required|exists:plan_trkes,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greška pri validaciji!', $validator->errors()]);
        }

        $statistikaTrke = StatistikaTrke::create([
            'ukupno_vreme' => $request->ukupno_vreme,
            'predjeni_km' => $request->predjeni_km,
            'trkac_id' => $request->trkac_id,
            'plan_trke_id' => $request->plan_trke_id,
        ]);



        return response()->json(['Statistika trke je dodata!', new StatistikaTrkeResource($statistikaTrke)]);
    }

}

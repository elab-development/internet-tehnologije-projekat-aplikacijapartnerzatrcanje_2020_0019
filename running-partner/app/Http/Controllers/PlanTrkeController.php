<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PlanTrkeResource;
use App\Models\PlanTrke;
use Illuminate\Support\Facades\Validator;

class PlanTrkeController extends Controller
{
    public function index(Request $request)
    {
        $query = PlanTrke::query();


        if ($request->has('mesto')) {
            $query->where('mesto', $request->mesto);
        }

        $planovi_trka = PlanTrke::all();
        $planovi_trka = $query->paginate(10);

        return PlanTrkeResource::collection($planovi_trka);

    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vreme' => 'required|date_format:H:i:s',
            'mesto' => 'required|string',
            'datum' => 'required|date_format:Y-m-d',
            'planirani_km' => 'required|numeric|between:0,9999.99',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri validaciji!', $validator->errors()]);
        }

        $planTrke = PlanTrke::create([
            'vreme' => $request->vreme,
            'mesto' => $request->mesto,
            'datum' => $request->datum,
            'planirani_km' => $request->planirani_km,
        ]);

        return response()->json(['Plan trke je dodat!', new PlanTrkeResource($planTrke)]);
    }

    public function show($id)
    {
        $planTrke = PlanTrke::find($id);

        if ($planTrke) {
            return new PlanTrkeResource($planTrke);
        } else {
            return response()->json('Plan trke koji zelite da nadjete ne postoji u bazi podataka!');
        }
    }



    public function update(Request $request, $id)
    {
        $planTrke = PlanTrke::find($id);

        if (is_null($planTrke)) {
            return response()->json('Plan trke koji zelite da azurirate ne postoji u bazi podataka!');
        }

        $validator = Validator::make($request->all(), [
            'vreme' => 'required|date_format:H:i:s',
            'mesto' => 'required|string',
            'datum' => 'required|date_format:Y-m-d',
            'planirani_km' => 'required|numeric|between:0,9999.99',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri azuriranju plana trke!', $validator->errors()]);
        }

        $planTrke->vreme = $request->vreme;
        $planTrke->mesto = $request->mesto;
        $planTrke->datum = $request->datum;
        $planTrke->planirani_km = $request->planirani_km;

        $planTrke->save();

        return response()->json(['Plan trke je azuriran!', new PlanTrkeResource($planTrke)]);

    }


}

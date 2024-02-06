<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrkacResource;
use App\Models\Trkac;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TrkacController extends Controller
{




    public function index(Request $request)
    {
        $query = Trkac::with('prijatelji');

        if ($request->has('pol')) {
            $query->where('pol', $request->pol);
        }

        $trkaci = $query->paginate(3);

        return TrkacResource::collection($trkaci);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:trkacs',
            'password' => 'required|string|min:6',
            'pol' => 'required|in:musko,zensko',
            'mesto' => 'required|string|max:100',
            'datum_rodjenja' => 'required|date',
            'prijatelj_id' => 'nullable|exists:trkacs,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri validaciji!', $validator->errors()]);
        }

        $trkac = Trkac::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'pol' => $request->pol,
            'mesto' => $request->mesto,
            'datum_rodjenja' => $request->datum_rodjenja,
            'prijatelj_id' => $request->prijatelj_id
        ]);
        $noviTrkac = Trkac::with('prijatelj')->find($trkac->id);
        return response()->json(['Trkac je dodat!', new TrkacResource($noviTrkac)]);
    }

    public function show($id)
    {
        $trkac = Trkac::with('prijatelji')->find($id);
        if ($trkac) {
            return new TrkacResource($trkac);
        } else {
            return response()->json('Trkač kog želite da nađete ne postoji u bazi podataka!');
        }
    }

    public function update(Request $request, $id)
    {
        $trkac = Trkac::find($id);

        if (is_null($trkac)) {
            return response()->json('Trkač kog želite da ažurirate ne postoji u bazi podataka!');
        }

        $validator = Validator::make($request->all(), [
            'prijatelj_id' => 'nullable|exists:trkacs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greška pri ažuriranju trkača!', $validator->errors()]);
        }

        $trkac->prijatelj_id = $request->prijatelj_id;

        $trkac->save();

        return response()->json(['Trkač je ažuriran!', new TrkacResource($trkac)]);
    }

    public function destroy($id)
    {
        $trkac = Trkac::find($id);

        if ($trkac) {
            $trkac->delete();
            return response()->json(['Uspešno ste obrisali trkača iz baze podataka!', new TrkacResource($trkac)]);
        } else {
            return response()->json('Trkač kog želite da obrišete ne postoji u bazi podataka!');
        }
    }

    public function getMestoInfo($id)
    {
        $trkac = Trkac::find($id);

        if (!$trkac) {
            return response()->json(['error' => 'Trkac nije pronadjen'], 404);
        }

        return response()->json(['mesto' => $trkac->mesto]);
    }





    public function addFriend(Request $request, $trkacId)
    {
        $loggedInTrkacId = auth()->user()->id;

        $trkac = Trkac::find($trkacId);

        if (is_null($trkac)) {
            return response()->json('Trkač kome želite da dodate prijatelja ne postoji u bazi podataka!');
        }

        $trkac->prijatelj_id = $loggedInTrkacId;
        $trkac->save();


        $loggedInTrkac = Trkac::find($loggedInTrkacId);
        $loggedInTrkac->prijatelj_id = $trkacId;
        $loggedInTrkac->save();

        return response()->json(['Prijatelj je uspešno dodat!', new TrkacResource($trkac)]);
    }



















}

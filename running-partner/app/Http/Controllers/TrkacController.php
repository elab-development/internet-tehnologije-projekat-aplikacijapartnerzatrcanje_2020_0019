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

        $query = Trkac::query();

        // Filtriranje po polju
        if ($request->has('pol')) {
            $query->where('pol', $request->pol);
        }

        // Paginacija
        $trkaci = $query->paginate(10);
        

        return TrkacResource::collection($trkaci);





       // $trkaci = Trkac::all();
        //return TrkacResource::collection($trkaci);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:trkacs',
            'lozinka' => 'required|string|min:6',
            'pol' => 'required|in:musko,zensko',
            'datum_rodjenja' => 'required|date',
            //'broj_telefona' => 'required|string|unique:trkacs',
            'prijatelj_id' => 'nullable|exists:trkacs,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska pri validaciji!', $validator->errors()]);
        }

        $trkac = Trkac::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'lozinka' => bcrypt($request->lozinka),
            'pol' => $request->pol,
            'datum_rodjenja' => $request->datum_rodjenja,
            // 'broj_telefona' => $request->broj_telefona,
            'prijatelj_id' => $request->prijatelj_id
        ]);

        return response()->json(['Trkac je dodat!', new TrkacResource($trkac)]);
    }

    public function show($id)
    {
        $trkac = Trkac::find($id);

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
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'datum_rodjenja' => 'required|date',
            'pol' => 'required|in:musko,zensko',
            // 'broj_telefona' => 'required|string|unique:trkacs,broj_telefona,' . $id,
            'email' => 'required|email',
            'lozinka' => 'required|string',
            'prijatelj_id' => 'nullable|exists:trkacs,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greška pri ažuriranju trkača!', $validator->errors()]);
        }

        $trkac->ime = $request->ime;
        $trkac->prezime = $request->prezime;
        $trkac->datum_rodjenja = $request->datum_rodjenja;
        $trkac->pol = $request->pol;
        $trkac->email = $request->email;
        $trkac->lozinka = bcrypt($request->lozinka);
        // $trkac->broj_telefona = $request->broj_telefona;
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
}

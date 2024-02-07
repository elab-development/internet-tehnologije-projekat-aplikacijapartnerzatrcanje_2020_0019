<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StatistikaTrke;
use App\Http\Resources\StatistikaTrkeResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class StatistikaTrkeController extends Controller
{


    public function index(Request $request)
    {
        $query = StatistikaTrke::query();

        if ($request->has('trkac_id')) {
            $query->where('trkac_id', $request->trkac_id);
        }

        if ($request->has('plan_trke_id')) {
            $query->where('plan_trke_id', $request->plan_trke_id);
        }

        if ($request->has('ukupno_vreme')) {
            $query->where('ukupno_vreme', '>', $request->ukupno_vreme);
        }

        $statistikeTrke = $query->with(['trkac', 'planTrka'])->paginate(10);

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

    public function getStatistikeByTrkacId($trkac_id)
    {
        $statistikeTrke = StatistikaTrke::where('trkac_id', $trkac_id)
            ->with(['trkac', 'planTrka'])
            ->paginate(10);

        return StatistikaTrkeResource::collection($statistikeTrke);
    }

    public function exportToCSV($trkac_id)
    {

        $statistikeTrka = StatistikaTrke::where('trkac_id', $trkac_id)->get();


        if ($statistikeTrka->isEmpty()) {
            return response()->json(['message' => 'Nema dostupne statistike za trkača sa ID ' . $trkac_id], 404);
        }

        $csvFileName = 'statistika_trke_export_trkac_' . $trkac_id . '.csv';

        $headers = array(
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );


        $handle = fopen('php://output', 'w');

        if ($handle === false) {
            return response()->json(['message' => 'Greška prilikom otvaranja CSV resursa.'], 500);
        }


        fputcsv($handle, array('ID', 'Ukupno vreme', 'Pređeni kilometri', 'Trkač ID', 'Plan trke ID'));


        foreach ($statistikeTrka as $statistika) {
            fputcsv(
                $handle,
                array(
                    $statistika->id,
                    $statistika->ukupno_vreme,
                    $statistika->predjeni_km,
                    $statistika->trkac_id,
                    $statistika->plan_trke_id
                )
            );
        }


        if (is_resource($handle)) {
            fclose($handle);
        }

        return response()->stream(
            function () use ($handle) {
                if (is_resource($handle)) {
                    fclose($handle);
                }
            },
            200,
            $headers
        );
    }

    public function prosecnaBrzina($statistikaId)
    {
        $prosecnaBrzina = DB::table('statistika_trkes')
            ->where('id', $statistikaId)
            ->select(DB::raw('AVG(predjeni_km / ukupno_vreme) as prosecna_brzina'))
            ->first();

        if (!$prosecnaBrzina) {
            return response()->json(['error' => 'Podaci nisu pronađeni.'], 404);
        }


        DB::table('statistika_trkes')
            ->where('id', $statistikaId)
            ->update(['prosecna_brzina' => $prosecnaBrzina->prosecna_brzina]);


        return response()->json(['prosecna_brzina' => $prosecnaBrzina->prosecna_brzina]);
    }



}

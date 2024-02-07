<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatistikaTrkeResource extends JsonResource
{
    public static $wrap = 'statistika_trke';
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ukupno_vreme' => $this->ukupno_vreme,
            'predjeni_km' => $this->predjeni_km,
            'prosecna_brzina' => $this->prosecna_brzina,
            'Trkac' => new TrkacResource($this->trkac),
            'Plan trke' => new PlanTrkeResource($this->planTrka),
        ];
    }
}

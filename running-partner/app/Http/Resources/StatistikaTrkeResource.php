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
            'ukupno_vreme' => $this->ukupno_vreme,
            'predjeni_km' => $this->predjeni_km,
            'trkac_id' => $this->trkac_id,
            'plan_trke_id' => $this->plan_trke_id,
        ];
    }
}

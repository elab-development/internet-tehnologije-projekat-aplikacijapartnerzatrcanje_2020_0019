<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrkacResource extends JsonResource
{
    public static $wrap = 'trkac';
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ime' => $this->ime,
            'prezime' => $this->prezime,
            'datum_rodjenja' => $this->datum_rodjenja,
            'pol' => $this->pol,
            // 'broj_telefona' => $this->broj_telefona,
            'email' => $this->email,
            //'prijatelj_id' => $this->prijatelj_id,
            'prijatelj' => new TrkacResource($this->whenLoaded('prijatelj')),
            'prijatelji' => TrkacResource::collection($this->whenLoaded('prijatelji'))
        ];
    }
}

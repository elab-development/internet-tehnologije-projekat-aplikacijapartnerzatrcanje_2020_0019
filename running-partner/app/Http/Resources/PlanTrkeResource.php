<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanTrkeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'vreme' => $this->vreme,
            'mesto' => $this->mesto,
            'datum' => $this->datum,
            'planirani_km' => $this->planirani_km,
        ];
    }
}

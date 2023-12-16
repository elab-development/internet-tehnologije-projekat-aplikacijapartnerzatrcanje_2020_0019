<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanTrkeResource extends JsonResource
{
    public static $wrap = 'plan_trke';
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'vreme' => $this->vreme,
            'mesto' => $this->mesto,
            'datum' => $this->datum,
            'planirani_km' => $this->planirani_km,
        ];
    }
}

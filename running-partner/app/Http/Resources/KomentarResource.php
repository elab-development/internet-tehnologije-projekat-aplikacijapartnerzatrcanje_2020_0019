<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KomentarResource extends JsonResource
{
    public static $wrap = 'komentar';

    public function toArray(Request $request): array
    {
        return [
            'ID' => $this->resource->id,
            'Tekst' => $this->resource->tekst,
            'Trkac' => new TrkacResource($this->trkac),
            'Plan_trke' => new PlanTrkeResource($this->planTrke),
        ];
    }
}

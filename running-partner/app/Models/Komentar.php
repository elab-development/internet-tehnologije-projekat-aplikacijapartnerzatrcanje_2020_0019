<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    use HasFactory;
    protected $fillable = [
        'tekst',
        'trkac_id',
        'plan_trke_id'
    ];
    public function trkac()
    {
        return $this->belongsTo(Trkac::class);
    }

    public function planTrke()
    {
        return $this->belongsTo(PlanTrke::class);
    }

}

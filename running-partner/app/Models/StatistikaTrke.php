<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatistikaTrke extends Model
{
    use HasFactory;
    protected $fillable = [
        'ukupno_vreme',
        'predjeni_km',
        'trkac_id',
        'plan_trke_id'
    ];
    public function planTrka()
    {
        return $this->belongsTo(PlanTrke::class, 'plan_trke_id');
    }

    public function trkac()
    {
        return $this->belongsTo(Trkac::class, 'trkac_id');
    }
}

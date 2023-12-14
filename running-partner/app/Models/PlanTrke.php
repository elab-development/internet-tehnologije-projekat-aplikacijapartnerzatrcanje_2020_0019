<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanTrke extends Model
{
    use HasFactory;
    protected $fillable = [
        'vreme',
        'mesto',
        'datum',
        'planirani_km'

    ];
    public function komentari()
    {
        return $this->hasMany(Komentar::class);
    }

    // Veza sa Trkacima putem StatistikeTrke
    /*public function trkaci()
    {
        return $this->belongsToMany(Trkac::class, 'statistike_trke')->withTimestamps();
    }*/

    public function trkaci()
    {
        return $this->belongsToMany(Trkac::class, 'statistika_trkes')
            ->withPivot(['ukupno_vreme', 'predjeni_km'])
            ->withTimestamps();
    }
}

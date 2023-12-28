<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trkac extends Model
{
    use HasFactory;
    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'lozinka',
        'pol',
        'datum_rodjenja',
        'broj_telefona',
        'prijatelj_id'
    ];
    public function komentari()
    {
        return $this->hasMany(Komentar::class);
    }

    // Veza sa PlanovimaTrka putem StatistikeTrke
    /*public function planoviTrka()
    {
        return $this->belongsToMany(PlanTrke::class, 'statistike_trke')->withTimestamps();
    }*/
    /*
    public function prijatelj()
    {
        return $this->belongsTo(Trkac::class, 'prijatelj_id');
    }*/
    public function planoviTrka()
    {
        return $this->belongsToMany(PlanTrke::class, 'statistika_trkes')
            ->withPivot(['ukupno_vreme', 'predjeni_km'])
            ->withTimestamps();
    }
}

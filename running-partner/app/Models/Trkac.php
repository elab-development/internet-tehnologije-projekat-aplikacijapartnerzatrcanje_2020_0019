<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Trkac extends Model
{
    use HasFactory;
    use HasApiTokens;
    protected $fillable = [
        'ime',
        'prezime',
        'email',
        'password',
        'pol',
        'mesto',
        'datum_rodjenja',
        'broj_telefona',
        'prijatelj_id',
        'slika'
    ];
    public function komentari()
    {
        return $this->hasMany(Komentar::class);
    }


    public function prijatelji(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Trkac::class, 'prijatelj_id', 'id');
    }

    public function prijatelj(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Trkac::class, 'prijatelj_id', 'id');
    }


    public function planoviTrka()
    {
        return $this->belongsToMany(PlanTrke::class, 'statistika_trkes')
            ->withPivot(['ukupno_vreme', 'predjeni_km'])
            ->withTimestamps();
    }
}

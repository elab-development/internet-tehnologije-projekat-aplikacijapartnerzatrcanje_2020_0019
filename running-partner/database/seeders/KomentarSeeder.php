<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Komentar;
use App\Models\Trkac; 
use App\Models\PlanTrke; 
class KomentarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Uzmite sve trkače i planove trkača iz baze
        $trkaci = Trkac::all();
        $planoviTrka = PlanTrke::all();

        // Iterirajte kroz trkače i dodajte komentare
        foreach ($trkaci as $trkac) {
            foreach ($planoviTrka as $planTrke) {
                Komentar::factory()->create([
                    'trkac_id' => $trkac->id,
                    'plan_trke_id' => $planTrke->id,
                ]);
            }
        }
    }
}

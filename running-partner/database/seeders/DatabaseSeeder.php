<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Komentar;
use App\Models\PlanTrke;
use App\Models\StatistikaTrke;
use App\Models\Trkac;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Trkac::factory(5)->create();

        // Nakon što su svi Trkac modeli kreirani, postavljamo prijatelj_id
        $trkaci = Trkac::all();

        foreach ($trkaci as $trkac) {
            $trkac->update(['prijatelj_id' => Trkac::factory()->create()->id]);
        }

        PlanTrke::factory(5)->create();
        Komentar::factory(5)->create();
        StatistikaTrke::factory(5)->create();



    }
}

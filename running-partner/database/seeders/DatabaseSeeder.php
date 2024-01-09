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

        $this->call([
            TrkacSeeder::class,
            PlanTrkeSeeder::class,
            KomentarSeeder::class,
            StatistikaTrkeSeeder::class,
        ]);


    }
}

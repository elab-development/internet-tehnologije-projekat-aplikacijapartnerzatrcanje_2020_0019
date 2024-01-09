<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trkac;

class TrkacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Trkac::factory()->count(10)->create();
    }
}

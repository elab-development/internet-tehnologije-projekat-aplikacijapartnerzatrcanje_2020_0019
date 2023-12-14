<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Komentar;
use App\Models\PlanTrke;
use App\Models\Trkac;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Komentar>
 */
class KomentarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tekst' => $this->faker->paragraph,
            'trkac_id' => Trkac::factory(),
            'plan_trke_id' => PlanTrke::factory(),
        ];
    }
}

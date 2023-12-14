<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StatistikaTrke;
use App\Models\Trkac;
use App\Models\PlanTrke;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StatistikaTrke>
 */
class StatistikaTrkeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ukupno_vreme' => $this->calculateTotalMinutes($this->faker->dateTimeBetween('00:00', '23:59')->format('H:i')),
            'predjeni_km' => $this->faker->randomFloat(2, 1, 10),
            'trkac_id' => Trkac::factory(),
            'plan_trke_id' => PlanTrke::factory(),
        ];
    }
    private function calculateTotalMinutes(string $time): int
    {
        list($hours, $minutes) = explode(':', $time);
        return ($hours * 60) + $minutes;
    }
}

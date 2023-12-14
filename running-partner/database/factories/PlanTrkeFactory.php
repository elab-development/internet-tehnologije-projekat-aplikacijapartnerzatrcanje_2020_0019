<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PlanTrke;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlanTrke>
 */
class PlanTrkeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vreme' => $this->faker->time(),
            'mesto' => $this->faker->city,
            'datum' => $this->faker->date(),
            'planirani_km' => $this->faker->randomFloat(2, 5, 20),
        ];
    }
}

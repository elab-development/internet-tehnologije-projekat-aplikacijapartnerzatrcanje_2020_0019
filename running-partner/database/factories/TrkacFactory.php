<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Trkac;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trkac>
 */
class TrkacFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ime' => $this->faker->firstName,
            'prezime' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'lozinka' => bcrypt('password'), // Možete koristiti bcrypt() za enkripciju lozinke
            'pol' => $this->faker->randomElement(['musko', 'zensko']),
            'datum_rodjenja' => $this->faker->date(),
            //'broj_telefona' => $this->faker->phoneNumber,
            //'prijatelj_id' => Trkac::factory(),
            'prijatelj_id' => Trkac::inRandomOrder()->first()?->id ?? null,
        ];
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('statistika_trkes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trkac_id');
            $table->unsignedBigInteger('plan_trke_id');
            $table->integer('ukupno_vreme');
            $table->float('predjeni_km');
            $table->timestamps();

            $table->foreign('trkac_id')->references('id')->on('trkacs');
            $table->foreign('plan_trke_id')->references('id')->on('plan_trkes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistika_trkes');
    }
};

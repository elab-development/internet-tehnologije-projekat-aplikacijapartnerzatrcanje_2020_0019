<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trkacs', function (Blueprint $table) {
            $table->id();
            $table->string('ime');
            $table->string('prezime');
            $table->date('datum_rodjenja');
            $table->enum('pol', ['musko', 'zensko']);
            $table->string('broj_telefona')->unique();
            $table->string('email');
            $table->string('lozinka');
            $table->unsignedBigInteger('prijatelj_id')->nullable();
            $table->foreign('prijatelj_id')->references('id')->on('trkacs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trkacs');
    }
};

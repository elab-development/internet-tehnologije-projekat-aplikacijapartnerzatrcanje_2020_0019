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
        Schema::table('trkacs', function (Blueprint $table) {
            $table->string('role')->default('trkac'); // Default vrednost može biti 'trkac' ili nešto drugo prema potrebi
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trkacs', function (Blueprint $table) {
            //
        });
    }
};

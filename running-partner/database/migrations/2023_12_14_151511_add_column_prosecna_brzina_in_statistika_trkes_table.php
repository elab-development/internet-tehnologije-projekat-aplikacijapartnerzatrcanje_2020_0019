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
        Schema::table('statistika_trkes', function (Blueprint $table) {
            $table->float('prosecna_brzina')->after('predjeni_km')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistika_trkes', function (Blueprint $table) {
            $table->dropColumn('prosecna_brzina');
        });
    }
};

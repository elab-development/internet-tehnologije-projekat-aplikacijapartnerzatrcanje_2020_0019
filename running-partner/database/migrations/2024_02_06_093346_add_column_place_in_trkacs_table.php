<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('trkacs', function (Blueprint $table) {
            $table->string('mesto')->nullable()->after('pol');
        });
    }

    public function down()
    {
        Schema::table('trkacs', function (Blueprint $table) {
            $table->dropColumn('mesto');
        });
    }
};
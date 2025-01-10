<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyDateDepartFinInObjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('objets', function (Blueprint $table) {
            $table->dateTime('dateDepart')->nullable()->change(); 
        $table->dateTime('dateFin')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('objets', function (Blueprint $table) {
            $table->date('dateDepart')->change(); // Revenir au type original
            $table->date('dateFin')->change();
        });
    }
}

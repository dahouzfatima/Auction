<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEncheresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('encheres', function (Blueprint $table) {
            $table->id();
            $table->double('prix');
            $table->date('date');
            $table->timestamps();
            $table->unsignedBigInteger('prop_id');
            $table->unsignedBigInteger('objet_id');
            $table->foreign('prop_id')->references('id')->on('users');
            $table->foreign('objet_id')->references('id')->on('objets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('encheres');
    }
}

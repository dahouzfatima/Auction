<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateObjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('objets', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->longText('description');
            $table->string('image');
            $table->text('address')->nullable();
            $table->double('prixInitial');
            $table->double('prixActuel');
            $table->date('dateDepart');
            $table->date('dateFin');
            $table->enum('etat',['en_attente','en_cours','termine']);
            $table->timestamps();
            $table->unsignedBigInteger('vendeur_id');
            $table->unsignedBigInteger('acheteur_id')->nullable();
            $table->foreign('vendeur_id')->references('id')->on('users');
            $table->foreign('acheteur_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('objets');
    }
}

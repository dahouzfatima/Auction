<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objet extends Model
{
    use HasFactory;
    protected $table = 'objets';
    protected $fillable = [
        'titre', 'description', 'image', 'address', 'prixInitial', 'prixActuel', 'dateDepart', 'dateFin', 'etat', 'vendeur_id', 'acheteur_id'
    ];
    public function vendeur(){
        return $this->belongsTo(User::class,'vendeur_id');
    }
    public function acheteur(){
        return $this->belongsTo(User::class,'acheteur_id');
    }
    public function encheres(){
        return $this->hasMany(Enchere::class,'objet_id');
    }
}

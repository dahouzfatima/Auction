<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enchere extends Model
{
    use HasFactory;
     protected $table='encheres';
     protected $fillable=['prix','date','objet_id','prop_id'];
     public function objet(){
        return $this->belongsTo(Objet::class,'objet_id');
     }
     public function prop(){
        return $this->belongsTo(User::class,'prop_id');
     }
    
}

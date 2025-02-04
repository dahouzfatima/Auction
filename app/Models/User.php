<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    //...
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
    ];
    public function ventes(){
        return $this->hasMany(Objet::class,'vendeur_id');
    }
    public function achats(){
        return $this->hasMany(Objet::class,'acheteur_id');
    }
    public function encheres(){
        return $this->hasMany(Enchere::class,'prop_id');
    }
    public function wishlist(){
    return $this->belongsToMany(Objet::class, 'wishlists', 'prop_id', 'objet_id')
                ->withTimestamps();}
    


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

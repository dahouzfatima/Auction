<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Wishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlists';
    protected $fillable = [
        'prop_id',
        'objet_id',
    ];
    public function objet()
{
    return $this->belongsTo(Objet::class);
}
}

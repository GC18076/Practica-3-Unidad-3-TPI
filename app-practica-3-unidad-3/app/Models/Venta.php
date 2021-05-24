<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\User;

class Venta extends Model
{
    use HasFactory;

    public function producto()
    {
        return $this->hasOne(Producto::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

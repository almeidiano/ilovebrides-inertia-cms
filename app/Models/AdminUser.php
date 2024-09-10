<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class AdminUser extends Authenticatable
{
    use Notifiable;

    protected $table = 'adminusers';

    public $timestamps = false;

//    protected $fillable = ['name', 'email', 'username', 'password', 'role', 'active']; // Defina os campos que podem ser preenchidos
}

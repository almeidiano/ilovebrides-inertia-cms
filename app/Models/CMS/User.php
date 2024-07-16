<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Importante para autenticação

class User extends Authenticatable
{
    use HasFactory;

    protected $connection = "ilovebrides_ilovebri";
    protected $table = 'users';

    protected $fillable = [
        "name", "username", "email", "password", "role", "profile_img_url", "newsletter"
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
//class User extends Authenticatable
//{
//    use HasFactory, Notifiable;
//
//    protected $connection = 'ilb-cms';
//
//    protected $fillable = [
//        "name", "email", "password"
//    ];
//
//    protected $hidden = [
//        'password', 'remember_token',
//    ];
//
//    protected $casts = [
//        'email_verified_at' => 'datetime',
//    ];
//}

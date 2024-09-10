<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SEO extends Model
{
    use HasFactory;
    protected $table = 'companyinfo';

    public $timestamps = false;

    protected $fillable = ['title', 'description', 'keywords'];
}

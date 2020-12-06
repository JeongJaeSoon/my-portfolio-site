<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stack extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'img_url', 'skillful', 'frequency', 'color'
    ];
}

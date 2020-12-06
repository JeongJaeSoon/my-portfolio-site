<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectStacks extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id', 'stack_id'
    ];
}

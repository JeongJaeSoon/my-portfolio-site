<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $project_data)
 */
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

    public function getList()
    {
        return self::all('id', 'title', 'color');
    }

    public function index()
    {
        return self::all();
    }

    public function store(array $project_data)
    {
        return self::create($project_data);
    }

    public function remove(Stack $stack)
    {
        return $stack->delete($stack);
    }
}

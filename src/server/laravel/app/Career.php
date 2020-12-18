<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $guarded;

    public function index()
    {
        return self::all();
    }

    public function store(array $career_data)
    {
        return self::create($career_data);
    }

    public function remove(Career $career)
    {
        return $career->delete($career);
    }
}

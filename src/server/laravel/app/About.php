<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $guarded;

    public function index()
    {
        return self::all()->reverse()->first();
    }

    public function store(array $about)
    {
        return self::create($about);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    public function index()
    {
        return self::all();
    }

    public function remove(Career $career)
    {
        return $career->delete($career);
    }
}

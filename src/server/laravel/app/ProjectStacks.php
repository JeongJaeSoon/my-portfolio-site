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

    public function store(int $project_id, array $stackIds)
    {
        foreach ($stackIds as $stackId) {
            self::create([
                'project_id' => $project_id,
                'stack_id' => $stackId
            ]);
        }
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $project_data)
 */
class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'content', 'repo_url', 'img_url',
        'start_date', 'end_date', 'role'
    ];

    public function index()
    {
        return self::all();
    }

    public function store(array $project_data)
    {
        return self::create($project_data);
    }

    public function remove(Project $project)
    {
        return $project->delete($project);
    }

    public function stacks()
    {
        return $this->belongsToMany('App\Stack', 'project_stacks');
    }
}

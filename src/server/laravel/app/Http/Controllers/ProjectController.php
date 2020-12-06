<?php

namespace App\Http\Controllers;

use App\Project;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class ProjectController extends Controller
{
    private $project;

    public function __construct()
    {
        $this->project = new Project();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|ResponseFactory|Request|Response
     */
    public function index()
    {
        return response([
            "projects" => $this->project->index()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:14|unique:projects',
            'content' => 'required|string|max:90',
            'repo_url' => 'required|string|max:255',
            'img_url' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'role' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        $result = $this->project->store($request->toArray());
        return get_class($result) === "App\Project" ?
            response([
                'msg' => '프로젝트 등록에 성공하였습니다.',
                'result' => $result
            ]) : response([
                'msg' => '프로젝트 등록에 실패하였습니다.'
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Project $project
     * @return Project[]|Application|ResponseFactory|Response
     */
    public function show(Project $project)
    {
        return response([
            'project' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Project $project
     * @return Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Project $project
     * @return Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Project $project
     * @return Response
     * //     * @throws Exception
     */
    public function destroy(Project $project)
    {
        try {
            $this->project->remove($project);
        } catch (Exception $exception) {
            return response([
                'msg' => '삭제에 실패하였습니다.'
            ]);
        }

        return response([
            'msg' => '삭제에 성공하였습니다.'
        ]);
//        dd($project->delete());
    }
}

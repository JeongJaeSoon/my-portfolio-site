<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectStacks;
use App\Stack;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class ProjectController extends Controller
{
    private $project;
    private $projectStack;
    private $imgCnt;

    public function __construct()
    {
        $this->project = new Project();
        $this->projectStack = new ProjectStacks();
        $this->imgCnt = new ImageController();
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
//        formData.append("title", title);
//        formData.append("repo_url", repoUrl);
//        formData.append("img_url", imgFile);
//        formData.append("content", content);
//        formData.append("stacks", stackIds);
//        formData.append("start_date", startDate);
//        formData.append("end_date", endDate);
//        formData.append("role", role);
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:14|unique:projects',
            'repo_url' => 'required|string|max:255',
            'img_url' => 'required|image|max:5000',
            'content' => 'required|string|max:90',
            'stacks' => 'required|array',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'role' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        // project 저장
        $result = $this->project->store([
            'title' => $request->input('title'),
            'repo_url' => $request->input('repo_url'),
            'img_url' => $this->imgCnt->saveProjectImg($request->input('title'), $request->file('img_url')),
            'content' => $request->input('content'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'role' => $request->input('role')
        ]);

        // project 의 stack list 저장
        $this->projectStack->store($result['id'], $request->input('stacks'));

        return $result instanceof \App\Project ?
            response([
                'msg' => '프로젝트 등록에 성공하였습니다.',
                'result' => $result
            ]) :
            response([
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
    }
}

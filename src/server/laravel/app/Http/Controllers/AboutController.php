<?php

namespace App\Http\Controllers;

use App\About;
use App\Career;
use Illuminate\Http\Request;
use Validator;

class AboutController extends Controller
{
    private $about;
    private $career;

    public function __construct()
    {
        $this->about = new About();
        $this->career = new Career();
    }

    public function index()
    {
        return response([
            "about" => $this->about->index(),
            "career" => $this->career->index()
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'main' => 'string|max:10',
            'region' => 'string|max:10',
            'tel' => 'string',
            'email' => 'email',
            'github' => 'url',
            'introduce' => 'string|max:100'
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        $isEmpty = [
            'main' => empty($request->input('main')),
            'region' => empty($request->input('region')),
            'tel' => empty($request->input('tel')),
            'email' => empty($request->input('email')),
            'github' => empty($request->input('github')),
            'introduce' => empty($request->input('introduce')),
        ];

        if (
            $isEmpty['main'] && $isEmpty['region'] && $isEmpty['tel'] &&
            $isEmpty['email'] && $isEmpty['github'] && $isEmpty['introduce']
        ) {
            return response([
                "msg" => "변경된 내용이 없습니다."
            ], 200);
        }

        $about = $this->about->index();
        $main = $isEmpty['main'] ? $about['main'] : $request->input('main');
        $region = $isEmpty['region'] ? $about['region'] : $request->input('region');
        $tel = $isEmpty['tel'] ? $about['tel'] : $request->input('tel');
        $email = $isEmpty['email'] ? $about['email'] : $request->input('email');
        $github = $isEmpty['github'] ? $about['github'] : $request->input('github');
        $introduce = $isEmpty['introduce'] ? $about['introduce'] : $request->input('introduce');

        $result = $this->about->store([
            'main' => $main,
            'region' => $region,
            'tel' => $tel,
            'email' => $email,
            'github' => $github,
            'introduce' => $introduce
        ]);

        return $result instanceof \App\About ?
            response([
                'msg' => '저장에 성공하였습니다.',
                'result' => $result
            ], 201) :
            response([
                'msg' => '저장에 실패하였습니다.',
            ], 400);
    }

    public function destroy(About $about)
    {
        try {
            $this->about->remove($about);
        } catch (Exception $exception) {
            return response([
                'msg' => '삭제에 실패하였습니다.'
            ], 400);
        }

        return response([
            'msg' => '삭제에 성공하였습니다.'
        ], 200);
    }
}

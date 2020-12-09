<?php

namespace App\Http\Controllers;

use App\Stack;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class StackController extends Controller
{
    private $stack;
    private $imgCnt;

    public function __construct()
    {
        $this->stack = new Stack();
        $this->imgCnt = new ImageController();
    }

    public function list()
    {
        return response([
            'stackList' => $this->stack->getList()
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $stacks = $this->stack->index();

        $stacks->each(function (&$item) {
            $stackImg = $this->imgCnt->getStackImg($item['img_url']);
            $item['stackImg'] = $stackImg;
        });

        return response([
            'stacks' => $stacks
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
     * @return Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:20|unique:stacks',
            'img_url' => 'required|image|max:5000',
            'skillful' => 'required|string|in:최상,상,중상,중,중하',
            'frequency' => 'required|integer|min:0|max:100',
            'color' => 'required|string|min:4|max:7'
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        $result = $this->stack->store([
            'title' => $request->input('title'),
            'skillful' => $request->input('skillful'),
            'frequency' => $request->input('frequency'),
            'color' => $request->input('color'),
            'img_url' => $this->imgCnt->saveStackImg($request->input('title'), $request->file('img_url'))
        ]);
        return $result instanceof \App\Stack ?
            response([
                'msg' => '기술 스택 등록에 성공하였습니다.',
                'result' => $result
            ]) : response([
                'msg' => '기술 스택 등록에 실패하였습니다.'
            ]);

    }

    /**
     * Display the specified resource.
     *
     * @param Stack $stack
     * @return Response
     */
    public function show(Stack $stack)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Stack $stack
     * @return Response
     */
    public function edit(Stack $stack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Stack $stack
     * @return Response
     */
    public function update(Request $request, Stack $stack)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Stack $stack
     * @return Response
     */
    public function destroy(Stack $stack)
    {
        try {
            $this->stack->remove($stack);
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

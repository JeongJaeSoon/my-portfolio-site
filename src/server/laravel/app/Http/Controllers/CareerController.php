<?php

namespace App\Http\Controllers;

use App\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    private $career;

    public function __construct()
    {
        $this->career = new Career();
    }

    public function index()
    {
        return response([
            'career' => $this->career->index()
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|string|min:7',
            'value' => 'required|string|max:15'
        ]);
    }

    public function destroy(Career $career)
    {
        try {
            $this->career->remove($career);
        } catch (Exception $exception) {
            return response([
                'msg' => '삭제에 실패하였습니다.',
                'error' => $exception
            ], 400);
        }

        return response([
            'msg' => '삭제에 성공하였습니다.'
        ], 200);
    }
}

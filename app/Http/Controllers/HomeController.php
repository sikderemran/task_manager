<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TaskRepositories\TaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
class HomeController extends Controller
{
    private $task;
    public function __construct(TaskRepositoryInterface $task){
        $this->task=$task;
    }
    public function index()
    {
        return response()->json($this->task->index());
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string|min:10'
        ]);
        return response()->json($this->task->store($request->all()));
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        return response()->json($this->task->edit($id));
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string|min:10',
        ]);
        return response()->json($this->task->update($request->all()));
    }

    public function destroy($id)
    {
        return response()->json($this->task->destroy($id));
    }
   
}

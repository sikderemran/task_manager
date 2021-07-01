<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\EmployeeRepositories\EmployeeRepositoryInterface;
class EmployeeController extends Controller
{

    private $task;
    public function __construct(EmployeeRepositoryInterface $employee){
        $this->employee=$employee;
    }
    public function index()
    {
        return response()->json($this->employee->index());
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'image' => 'mimes:jpeg,jpg,png,gif|required|max:2000',
            'password' => 'required|string',
        ]);

        $image = $request->file('image');
        $ext = $image->extension();
        $name = time().rand(5,10).'.'.$ext ;
        $path=$image->move(public_path('asset/img'), $name);
        
        return response()->json($this->employee->store($request->all(),$name));
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        return response()->json($this->employee->edit($id));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'image' => 'mimes:jpeg,jpg,png,gif|required|max:2000',
            'password' => 'required|string',
        ]);

        $image = $request->file('image');
        $ext = $image->extension();
        $name = time().rand(5,10).'.'.$ext ;
        $path=$image->move(public_path('asset/img'), $name);
        
        return response()->json($this->employee->update($request->all(),$name));
    }

    public function destroy($id)
    {
        return response()->json($this->employee->destroy($id));
    }

}

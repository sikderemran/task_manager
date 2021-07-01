<?php
namespace App\Repositories\TaskRepositories;
use App\Models\Task;
use App\Repositories\TaskRepositories\TaskRepositoryInterface;
use Illuminate\Support\Facades\Auth;
class TaskRepository implements TaskRepositoryInterface{
    public function index()
    {
        $tasks=Task::where('user_id',Auth::guard('web')->id())
                    ->with('user')
                    ->get();
        $todo=0;
        $progress=0;
        $done=0;
        foreach($tasks as $task){
            if($task->status==0){
                $todo++;
            }
            if($task->status==1){
                $progress++;
            }
            if($task->status==2){
                $done++;
            }
        }
        return [$tasks,$todo,$progress,$done,Auth::guard('web')->id()];
    }

    public function create()
    {
        //
    }

    public function store(array $data)
    {
        $task=Task::create(
            [
                'title'=>$data['title'],
                'description'=>$data['description'],
                'user_id'=>Auth::guard('web')->id()
            ]
        );
        $task=Task::orderBy('id','desc')
                    ->with('user')
                    ->first();
        return [$task,'1'];
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $task=Task::where('user_id',Auth::guard('web')->id())
                    ->where('id',$id)
                    ->first();
        return $task;
    }

    public function update(array $data)
    {
        $task=Task::where('id',$data['id']) 
                    ->where('user_id',Auth::guard('web')->id())
                    ->first();
        $task->title=$data['title'];
        $task->description=$data['description'];
        $task->status=$data['status'];  
        $task->save(); 
        return $task;     
    }

    public function destroy($id)
    {
       return Task::destroy($id);
    }
}
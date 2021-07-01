<?php
namespace App\Repositories\EmployeeRepositories;
use App\Repositories\EmployeeRepositories\EmployeeRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class EmployeeRepository implements EmployeeRepositoryInterface{
    
    public function index()
    {
        $user=User::all();
        return $user;
    }

    public function create()
    {
        //
    }

    public function store(array $data,$image)
    {
       
        $employee=User::create(
            [
                'name'=>$data['name'],
                'email'=>$data['email'],
                'password'=>Hash::make($data['password']),
                'image'=> $image
            ]
            );
        return $employee;
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $employee=User::find($id);
        return $employee;
    }

    public function update(array $data,$name)
    {
        $employee=User::find($data['id']);
        $employee->name=$data['name'];
        $employee->email=$data['email'];
        $employee->password=Hash::make($data['password']);  
        $employee->image=$name; 
        $employee->save(); 
        return $employee;     
    }

    public function destroy($id)
    {
        User::destroy($id);
        return 'delete';
    }
  
 
}
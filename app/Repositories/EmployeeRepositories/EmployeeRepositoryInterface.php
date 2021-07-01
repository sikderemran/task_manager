<?php
namespace App\Repositories\EmployeeRepositories;

interface EmployeeRepositoryInterface{
    public function index();

    public function create();

    public function store(array $data,$image);

    public function show($id);

    public function edit($id);

    public function update(array $data,$name);

    public function destroy($id);

    
}
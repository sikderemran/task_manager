<?php
namespace App\Repositories\TaskRepositories;
interface TaskRepositoryInterface{
    public function index();

    public function create();

    public function store(array $data);

    public function show($id);

    public function edit($id);

    public function update(array $data);

    public function destroy($id);
}
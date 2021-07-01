<?php

namespace App\Providers;

use App\Repositories\TaskRepositories\TaskRepositoryInterface;
use App\Repositories\TaskRepositories\TaskRepository;
use Illuminate\Support\ServiceProvider;

class TaskServiceProvider extends ServiceProvider
{
  
    public function register()
    {
        $this->app->bind(TaskRepositoryInterface::class,TaskRepository::class);
    }

    public function boot()
    {
        //
    }
}

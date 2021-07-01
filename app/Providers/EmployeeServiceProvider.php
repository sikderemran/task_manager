<?php

namespace App\Providers;

use App\Repositories\EmployeeRepositories\EmployeeRepositoryInterface;
use App\Repositories\EmployeeRepositories\EmployeeRepository;
use Illuminate\Support\ServiceProvider;

class EmployeeServiceProvider extends ServiceProvider
{
  
    public function register()
    {
        $this->app->bind(EmployeeRepositoryInterface::class,EmployeeRepository::class);
    }

    public function boot()
    {
        //
    }
}

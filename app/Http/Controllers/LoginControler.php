<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
class LoginControler extends Controller
{
    use AuthenticatesUsers;
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
       
        $user=User::where('email',$request->email)
                    ->first();
        if(!is_null($user))
        {
            if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
                $this->fireLockoutEvent($request);
                return $this->sendLockoutResponse($request);
            }
            if ($this->guard()->attempt(
                $request->only('email', 'password'), $request->filled('remember'))) {
                return $this->sendLoginResponse($request);
            }
            $this->incrementLoginAttempts($request);
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
            
        }else if(!is_null($user))
        {
            
            if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
            }
            $this->incrementLoginAttempts($request);

            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed'),"error"],
                
            ]);
        }else{
            if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
            }
            $this->incrementLoginAttempts($request);

            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
        }
    }

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return $this->authenticated($request, $this->guard()->user())
                ?:response()->json($this->guard()->user());
    }
    protected function authenticated(Request $request, $user)
    {
        //
    }

    public function logout(Request $request)
    {
        $user=$this->guard();
        $this->guard()->logout();

        $request->session()->invalidate();

        return response()->json("ok");     
        // return $this->loggedOut($request) ?: redirect('signin');
    }
    protected function loggedOut(Request $request)
    {
        //
    }
    protected function guard()
    {
        return Auth::guard('web');
    }
}

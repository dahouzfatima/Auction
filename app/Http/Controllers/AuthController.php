<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data=$request->validated();
        $user=User::create([
            'firstName'=>$data['firstName'],
        'lastName'=>$data['lastName'],
        'email'=>$data['email'],
        'password'=>bcrypt($data['password'])
        ]);
        $token=$user->createToken('main')->plainTextToken;
        return response(
            [
                'user'=>$user,
                'token'=>$token
            ]
            );
    }
    public function login(LoginRequest $request){
            $credentials=$request->validated();
            $remeber=$credentials['remember']??false;
            unset($credentials['remember']);
            if(!Auth::attempt($credentials,$remeber)){
                return response([
                    'error'=>'the provided credentials are not correct'
                ],422);
            };
            $user=Auth::user();
            $token=$user->createToken('main')->plainTextToken;
            return response(
                [
                    'user'=>$user,
                    'token'=>$token
                ]
                );
    }
    public function logout(Request $request){
        /** @var User $user */
        $user=Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success'=>true
        ]);

    }
    public function me(Request $request)
{
    return $request->user() ;
}
}

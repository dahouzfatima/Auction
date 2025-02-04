<?php

namespace App\Http\Requests;
use \Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName'=>'required|string',
            'lastName'=>'required|string',
            'email'=>'required|string|email|unique:users,email',
            'password'=>['required','confirmed',Password::min(8)->mixedCase()->numbers()->symbols()]
        ];
    }
}

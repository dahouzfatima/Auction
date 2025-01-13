import { Container } from "postcss";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios.js';
import { userStateContext } from "../contexts/ContextProvider.jsx";
export default function Authentification() {
    const [register, setRegister] = useState(false)
    const RegisterClick = (e) => {
        e.preventDefault();
        setRegister(true);
        console.log(register);
    }
    const LoginClick = (e) => {
        e.preventDefault();
        setRegister(false);
    }
    const { setCurrentUser, setUserToken } = userStateContext({});
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirrmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState({ __html: '' });
    const onRegisterSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: '' });
        axiosClient.post('/signup', {
            firstName,
            lastName,
            email, password,
            password_confirmation: passwordConfirrmation

        }).then(({ data }) => {
            console.log(data);
            setCurrentUser(data.user);
            setUserToken(data.token);
            navigate('/preview');

        })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], []);
                    console.log(finalErrors);
                    setError({ __html: finalErrors.join('<br>') });
                }
                console.error(error)
            })
    }
    const onLoginSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: '' });
        axiosClient.post('/login', {
            email, password

        }).then(({ data }) => {
            console.log(data);
            setCurrentUser(data.user);
            console.log(data.user);
            setUserToken(data.token);
            navigate('/preview');

        })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errors) {
                    const finalErrors = Object.values(error.response.data.errors)
                        .flat()
                        .join('<br>');
                    setError({ __html: finalErrors });
                } else {
                    setError({ __html: 'An unexpected error occurred. Please try again.' });
                }

                console.error(error)
            })
    }
    return (
        <div className="authbody w-screen" >
            <div className={` overflow-hidden m-[20px] container1 relative w-[850px] h-[600px] bg-[#fff] ${register ? 'active' : ''}`}>
                <div className=" form-box login absolute w-[50%]   right-0 flex items-center text-center px-[40px]">
                    <form action="#" onSubmit={onLoginSubmit} className="w-full " method="POST">
                        <h1 className="text-[36px] font-extrabold">Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        {
                            error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)
                        }
                        <button type="submit" className="w-full  font-bold  bg-[#5a3920] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md">
                            Login
                        </button>
                        <h4 className="text-[#333] mt-[15px] underline">Forget Password ?</h4>
                    </form>
                </div>
                <div className=" toggle-box  absolute w-full h-full flex ">
                    <div className="toggle-panel toggle-left my-1  absolute w-[50%] h-full  text-[#fff] flex flex-col items-center justify-center">
                        <h1 className="text-[36px] font-extrabold">Welcome !</h1>
                        <p className="">Don't have an account ?</p>
                        <button className="w-[160px] font-bold  bg-black h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={RegisterClick}>Register</button>
                    </div>
                    <div className="toggle-panel toggle-right my-1 absolute w-[50%] h-full  text-[#fff] flex flex-col items-center justify-center">
                        <h1 className="text-[36px] font-extrabold">Welcome Back!</h1>
                        <p className="">Already have an account ?</p>
                        <button className="w-[160px] font-bold  bg-black h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={LoginClick}>Login</button>
                    </div>
                </div>
                <div className="   form-box register absolute w-[50%]   right-0 flex items-center text-center px-[40px]">
                    <form onSubmit={onRegisterSubmit} action="#" className="w-full ">
                        <h1 className="text-[36px] font-extrabold">Register</h1>
                        <div className="input-box">
                            <input type="text" placeholder="First Name" name="firstName" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Last Name" name="lastName" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}></input>
                            <i class='bx bxs-envelope'></i>                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password Confirmation" name="password-confirmation" value={passwordConfirrmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        {
                            error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)
                        }
                        <button className="w-full  font-bold  bg-[#5a3920] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" type="submit"  >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
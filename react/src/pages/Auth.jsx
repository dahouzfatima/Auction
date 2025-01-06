import { Container } from "postcss";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/css/Auth.css';
import { useNavigate } from 'react-router-dom';
export default function Authentification() {
    const navigate = useNavigate();
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
    return (
        <div className="authbody w-screen" >
            <div className={`container overflow-hidden m-[20px] container1 relative w-[850px] h-[550px] bg-[#fff] ${register ? 'active' : ''}`}>
                <div className=" form-box login absolute w-[50%]   right-0 flex items-center text-center px-[40px]">
                    <form action="#" className="w-full ">
                        <h1 className="text-[36px] font-extrabold">Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username"  name="email" required></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" name="password" required></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <button type="button" className="w-full  font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={() => navigate('/HomePage')}>
                            <Link to='/HomePage'>Login</Link>
                        </button>
                        <h1 className="text-[#333] mt-[5px] underline">Forget Password ?</h1>
                    </form>
                </div>
                <div className=" toggle-box  absolute w-full h-full flex ">
                    <div className="toggle-panel toggle-left my-1  absolute w-[50%] h-full  text-[#fff] flex flex-col items-center justify-center">
                        <h1 className="text-[36px] font-extrabold">Welcome !</h1>
                        <p className="">Don't have an account ?</p>
                        <button className="w-[160px] font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={RegisterClick}>Register</button>
                    </div>
                    <div className="toggle-panel toggle-right my-1 absolute w-[50%] h-full  text-[#fff] flex flex-col items-center justify-center">
                        <h1 className="text-[36px] font-extrabold">Welcome Back!</h1>
                        <p className="">Already have an account ?</p>
                        <button className="w-[160px] font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={LoginClick}>Login</button>
                    </div>
                </div>
                <div className=" form-box register absolute w-[50%]   right-0 flex items-center text-center px-[40px]">
                    <form action="" className="w-full ">
                        <h1 className="text-[36px] font-extrabold">Register</h1>
                        <div className="input-box">
                            <input type="text" placeholder="First Name" required name="firstName"></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Last Name" required name="lastName"></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required name="email"></input>
                            <i class='bx bxs-envelope'></i>                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required name="password"></input>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <button className="w-full  font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" onClick={() => navigate('/HomePage')}  >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
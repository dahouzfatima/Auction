import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../axios.js';
import { userStateContext } from "../contexts/ContextProvider.jsx";
export default function SignUp() {
    const { setCurrentUser, setUserToken } = userStateContext({});
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirrmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState({ __html: '' });
    const onSubmit = (ev) => {
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
    return (
        <>
            <div className="  flex items-center text-center px-[40px]">
                <form onSubmit={onSubmit} action="#" className="w-full ">
                    <h1 className="text-[36px] font-extrabold">Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="First Name" required name="firstName" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}></input>
                        <i class='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Last Name" required name="lastName" value={lastName}
                            onChange={(e) => setLastName(e.target.value)}></input>
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}></input>
                        <i class='bx bxs-envelope'></i>                        </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}></input>
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password Confirmation" required name="password-confirmation" value={passwordConfirrmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                        <i class='bx bxs-lock-alt'></i>
                    </div>
                    {
                        error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)
                    }
                    <button className="w-full  font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md" type="submit"  >
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}
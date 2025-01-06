import { useState } from "react";
import axiosClient from '../axios.js';
import { Link, useNavigate } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider.jsx";
export default function Login() {
    const { setCurrentUser, setUserToken } = userStateContext({});
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: '' });
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: '' });
        axiosClient.post('/login', {
            email, password

        }).then(({ data }) => {
            console.log(data);
            setCurrentUser(data.user);
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
        <>
            <div className=" form-box login  flex items-center text-center px-[40px]">
                <form action="#" onSubmit={onSubmit} className="w-full " method="POST">
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
                    <button type="submit" className="w-full  font-bold  bg-[#353b6c] h-[48px] text-center cursor-pointer text-white mt-4 rounded-md">
                        Login
                    </button>
                    <h1 className="text-[#333] mt-[5px] underline">Forget Password ?</h1>
                </form>
            </div>
        </>
    )
}
import { Link } from "react-router-dom";
export default function Login() {
    return (
        <>
            <div className=" form-box login  flex items-center text-center px-[40px]">
                <form action="#" className="w-full ">
                    <h1 className="text-[36px] font-extrabold">Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" name="email" required></input>
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
        </>
    )
}
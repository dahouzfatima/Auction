import React from "react";
import axiosClient from '../axios.js';
import { RiAuctionLine } from "react-icons/ri";
import { userStateContext } from "../contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";
function Sidebar({ setActiveComponent }) {
    const { currentUser, userToken, setCurrentUser, setUserToken } = userStateContext();
    const navigate = useNavigate();
    const logout = (ev) => {
        axiosClient.post('logout').then(res => {
            setCurrentUser({});
            setUserToken(null);
        })
    }
    return (
        <div className="flex flex-col p-4 border border-gray-200">
            <div className="flex flex-col space-y-10">
                <div className="flex  flex-row   group hover:bg-black border border-gray-200 px-3 py-1 cursor-pointer w-fit sm:w-auto" onClick={() => setActiveComponent("Dashboard")}>
                    <i className="bx bxs-dashboard text-2xl sm:text-4xl group-hover:text-white sm:mr-3"></i>
                    <p
                        className="group-hover:text-white  hidden sm:inline-block  text-xl font-roboto leading-relaxed"
                    >
                        Dashboard
                    </p>
                </div>
                <div onClick={() => setActiveComponent("Profile")} className=" cursor-pointer grid grid-cols-1 md:grid-cols-[auto,1fr] group  hover:bg-black  border  w-fit sm:w-auto border-gray-200 px-3 py-1">
                    <div>
                        <i class='bx bx-user text-2xl sm:text-4xl group-hover:text-white sm:mr-3'></i>
                    </div>
                    <p className="group-hover:text-white  hidden sm:inline-block min-w-[650px]:hidden text-xl  font-roboto  leading-relaxed" >Profile</p>
                </div>
                <div className="inline-flex items-center group hover:bg-black border border-gray-200 px-3 py-1 cursor-pointer w-fit sm:w-auto" onClick={() => setActiveComponent("Items")}>
                    <i className="bx bx-trending-down text-2xl sm:text-4xl group-hover:text-white sm:mr-3"></i>
                    <p
                        className="group-hover:text-white hidden sm:inline-block  text-xl font-roboto leading-relaxed"
                    >
                        Posted Items
                    </p>
                </div>
                <div onClick={() => setActiveComponent("BiddingItems")} className=" cursor-pointer grid grid-cols-1 md:grid-cols-[auto,1fr] group  w-fit sm:w-auto  hover:bg-black  border border-gray-200 px-3 py-1">
                    <div>
                        <RiAuctionLine className="text-2xl sm:text-4xl group-hover:text-white sm:mr-3" />
                    </div>
                    <p className="group-hover:text-white  hidden sm:inline-block min-w-[650px]:hidden text-xl  font-roboto  leading-relaxed" >Bidding Items</p>
                </div>
                <div onClick={() => setActiveComponent("Wishlist")} className="grid  cursor-pointer grid-cols-1 md:grid-cols-[auto,1fr] group  w-fit sm:w-auto  hover:bg-black  border border-gray-200 px-3 py-1">
                    <div className="group-hover:text-white">
                        <i class='bx bx-heart text-2xl sm:text-4xl group-hover:text-white sm:mr-3' ></i>
                    </div>
                    <p className="group-hover:text-white  hidden sm:inline-block min-w-[650px]:hidden text-xl  font-roboto  leading-relaxed" >Wishlist</p>
                </div>
                <div onClick={logout} className="grid cursor-pointer grid-cols-1 md:grid-cols-[auto,1fr] group  w-fit sm:w-auto  hover:bg-black  border border-gray-200 px-3 py-1">
                    <div className="group-hover:text-white ">
                        <i class='bx bx-log-in text-2xl sm:text-4xl group-hover:text-white sm:mr-3'></i>
                    </div>
                    <p className="group-hover:text-white  hidden sm:inline-block min-w-[650px]:hidden text-xl  font-roboto leading-relaxed" >Logout</p>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;

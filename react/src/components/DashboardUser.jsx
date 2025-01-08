import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function DashboardUser() {
    const { userToken, setCurrentUser, currentUser, setUserToken } = userStateContext();
    return (
        <>
            <div className="flex ">
                <h1 className="font-light text-xl flex justify-center items-center">Hello,{currentUser.firstName} {currentUser.lastName}</h1>
                <img height="40" width="40" src="https://img.icons8.com/?size=100&id=1H52efUsDX7A&format=png&color=000000"></img>
            </div>
            <h2 className="font-light text-gray-700">Welcome Back on your Dashboard</h2>
        </>
    )
}
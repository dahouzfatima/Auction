import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function DashboardUser() {
    const { userToken, setCurrentUser, currentUser, setUserToken } = userStateContext();
    return (
        <div className=" ">
            <div className="flex ">
                <h1 className="font-serif text-xl flex justify-center items-center">Hello,{currentUser.firstName} {currentUser.lastName}</h1>
                <img height="40" width="40" src="https://img.icons8.com/?size=100&id=1H52efUsDX7A&format=png&color=000000"></img>
            </div>
            <h2 className="font-light text-gray-700">Welcome Back on your Dashboard</h2>
            <div class="grid grid-cols-1 md:grid-cols-2  gap-6 mt-10 ">
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Order Pending</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">01</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Order Processing</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">00</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Order Picked</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">02</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Order Completed</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">02</p>
                </div>
            </div>
        </div>
    )
}
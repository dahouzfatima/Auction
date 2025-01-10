import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function DashboardUser() {
    const { userToken, setCurrentUser, currentUser, setUserToken } = userStateContext();
    const [postedItems, setPostedItems] = useState(null);
    const [winnedBids, setWinnedBids] = useState(null);
    const [losedBids, setLosedBids] = useState(null);
    const [participatedItems, setParticipatedItems] = useState(null);
    useEffect(() => {
        if (currentUser && currentUser.id) {
            axiosClient.get(`/dashboardUser`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then(({ data }) => {
                    setLosedBids(data.losedBids);
                    setParticipatedItems(data.participatedItems);
                    setPostedItems(data.postedItems);
                    setWinnedBids(data.winnedBids);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération du dashboard:", error);
                });
        }
    }, [currentUser, userToken]);

    return (
        <div className=" ">
            <div className="flex ">
                <h1 className="font-serif text-xl flex justify-center items-center">Hello,{currentUser.firstName} {currentUser.lastName}</h1>
                <img height="40" width="40" src="https://img.icons8.com/?size=100&id=1H52efUsDX7A&format=png&color=000000"></img>
            </div>
            <h2 className="font-light text-gray-700">Welcome Back on your Dashboard</h2>
            <div class="grid grid-cols-1 md:grid-cols-2  gap-6 mt-10 ">
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Posted Items</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">{postedItems}</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Participated Items</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">{participatedItems}</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Winned Bids</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">{winnedBids}</p>
                </div>
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 class="text-lg font-serif py-4 text-black underline">Losed Bids</h2>
                    <p class="text-4xl font-bold text-gray-900 mt-2">{losedBids}</p>
                </div>
            </div>
        </div>
    )
}
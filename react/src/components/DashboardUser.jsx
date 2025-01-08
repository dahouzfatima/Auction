import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function DashboardUser() {
    const { userToken, setCurrentUser, currentUser, setUserToken } = userStateContext();
    const [sales, setSales] = useState([]);
    useEffect(() => {
        console.log("current user",currentUser);
        if (currentUser && currentUser.id) {
            // Effectuer la requête pour récupérer les ventes en utilisant l'ID de l'utilisateur
            axiosClient.get(`/sales/${currentUser.id}
`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then(({ data }) => {
                    // Mettre à jour l'état avec les ventes récupérées
                    setSales(data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des ventes:", error);
                });
        }
    }, [currentUser, userToken]);
    return (
        <>
            <div className="flex ">
                <h1 className="font-light text-xl flex justify-center items-center">Hello,{currentUser.firstName} {currentUser.lastName}</h1>
                <img height="40" width="40" src="https://img.icons8.com/?size=100&id=1H52efUsDX7A&format=png&color=000000"></img>
            </div>
            <h2 className="font-light text-gray-700">Welcome Back on your Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {sales.length === 0 ? (
                            <p>No sales data available.</p>
                        ) : (
                            sales.map((sale) => (
                                <div key={sale.id}>
                                    <h3>Sale ID: {sale.id}</h3>
                                    <p>Amount: {sale.prixInitial}</p>
                                    <p>Date: {sale.prixActuel}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    div1
                </div>
                <div>
                    div1
                </div>
                <div>
                    div1
                </div>
            </div>
        </>
    )
}
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { links } from "./MyLinks";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function Header({ SearchTerm, handleSearch }) {
    const [hoverMenu, setHoverMenu] = useState("");
    const { userToken, setCurrentUser, currentUser, setUserToken } = userStateContext();

    if (!userToken) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        console.log("Authorization Header:", {
            'Authorization': `Bearer ${userToken}`,
        });

        // Envoi de la requête à l'API avec le token
        axiosClient.get('/me', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
            .then(({ data }) => {
                console.log("data:", data);
                setCurrentUser(data);
            })
            .catch((error) => {
                console.error("Request error:", error);
            });
    }, [userToken]);


    // Ajoutez userToken dans les dépendances pour que l'effet se déclenche quand il change

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl font-bold md:ml-10">
                    <Link to="/">BidThic</Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4 text-center ">
                    <input
                        name="search"
                        type="text"
                        value={SearchTerm}
                        onChange={handleSearch}
                        placeholder="Search your product here"
                        className="md:w-[50%] w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none"
                    />
                </div>

                {/* Account and Language */}
                <div className="flex items-center space-x-4 md:mr-10">
                    <div className="text-gray-600 cursor-pointer">English ▾</div>
                    <div className="cursor-pointer">
                        <ion-icon name="heart-outline" size="large"></ion-icon>
                    </div>
                    <div>
                        <Link
                            to="/preview/dashboard"
                            className="bg-black text-white py-2 px-4 rounded-full hover:bg-white hover:text-black border border-black"
                        >
                            Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="">
                <div className="container mx-auto px-4">
                    <ul className="flex space-x-8">
                        {/* Home */}
                        <li className="relative group">
                            <Link to="/preview" className="py-4 block hover:text-primary">
                                Home
                            </Link>
                        </li>

                        {/* Contact */}
                        <li className="relative group">
                            <Link to="/contact" className="py-4 block hover:text-primary">
                                Contact
                            </Link>
                        </li>

                        {/* Resources Dropdown */}
                        <li
                            className="relative group"
                            onMouseEnter={() => setHoverMenu("Resources")}
                            onMouseLeave={() => setHoverMenu("")}
                        >
                            <button className="py-4 block hover:text-primary focus:outline-none">
                                Resources ▾
                            </button>
                            {hoverMenu === "Resources" && (
                                <div className="absolute top-full left-0 w-[200px] bg-white shadow-md mt-2 rounded-md z-10">
                                    <ul className="py-2">
                                        {links[0].sublinks.map((item) => (
                                            <li
                                                key={item.name}
                                                className="px-4 py-2 hover:bg-gray-100"
                                            >

                                                <Link to={item.link} className="block text-gray-700">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};


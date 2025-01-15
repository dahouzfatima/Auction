import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { Link, Navigate } from "react-router-dom";


export default function Wishlist() {
    const { userToken, currentUser } = userStateContext();
    const [wishes, setWishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            axiosClient.get(`/wishlistU`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then(({ data }) => {
                    console.log(data.data);
                    setWishes(data.data);
                    setTotalPages(data.last_page);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des ventes:", error);
                });
        }
    }, [currentUser, userToken, currentPage]);

    return (
        <div className="flex flex-col">
            <h1 className="font-bold mb-5 text-xl">All Wished Items</h1>
            <div className=" hidden md:block">
                <table className="min-w-full  border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 font-sans">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Initial Price</th>
                            <th className="border border-gray-300 px-4 py-2">Current Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishes.length !== 0 && wishes.map((wish) => (
                            <tr key={wish.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={wish.image} alt={wish.titre} className="w-10 h-10 object-cover text-center" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{wish.titre}</td>
                                <td className="border border-gray-300 px-4 py-2 font-semibold text-red-800">${wish.prixInitial}</td>
                                <td className="border border-gray-300 px-4 py-2 font-semibold text-red-800">${wish.prixActuel}</td>
                                <td className={`border border-gray-300 px-4 py-2 ${wish.etat === 'termine' ? 'text-green-600' : 'text-red-600'}`}>
                                    {wish.etat}
                                </td>
                                <td className="border border-gray-300 text-center">
                                    <Link to={`/details/${wish.id}`} >
                                        <button class="hover:underline text-slate-950 py-2 px-2  border border-black rounded hover:bg-slate-950 hover:text-slate-50 ">Start a Bid</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden">
                {wishes.length !== 0 && wishes.map((wish) => (
                    <div key={wish.id} className="border border-gray-200 rounded-md p-4 mb-4 shadow-md">
                        <div className="flex flex-col space-y-2">
                            <img src={wish.image} alt={wish.titre} className="w-20 h-20 object-cover mx-auto" />
                            <div>
                                <strong>Title:</strong> {wish.titre}
                            </div>
                            <div className="font-semibold ">
                                <strong>Initial Price:</strong> <span className="text-red-800">${wish.prixInitial}</span>
                            </div>
                            <div className="font-semibold  ">
                                <strong className="">Actual Price:</strong>
                                <span className={`text-red-800 font-bold`}>
                                    {wish.prixActuel}
                                </span>
                            </div>
                            <div className="font-semibold  ">
                                <strong className="">Status:</strong>
                                <span className={`border border-gray-300 px-4 py-2 ${wish.etat === 'termine' ? 'text-green-600' : 'text-red-600'}`}>
                                    {wish.etat}
                                </span>
                            </div>
                            <div>
                                <Link to={`/details/${wish.id}`} >
                                    <button class="bg-white text-black py-2 px-4 mt-5   border border-black rounded hover:bg-black hover:text-white ">Start a Bid</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:absolute md:bottom-5 md:right-5  flex space-x-1 mt-7 justify-end">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black disabled:pointer-events-none disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-9 text-center text-sm transition-all shadow-sm ${currentPage === page
                            ? "bg-black text-white border border-transparent shadow-md"
                            : "border border-slate-300 text-slate-600 hover:text-white hover:bg-black hover:border-black"
                            } ml-2`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border border-slate-300 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-black hover:border-black disabled:pointer-events-none disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { Link, Navigate } from "react-router-dom";


export default function BiddingItems() {
    const { userToken, currentUser } = userStateContext();
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            axiosClient.get(`/encheres/${currentUser.id}?page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then(({ data }) => {
                    setSales(data.data);
                    setTotalPages(data.last_page);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des ventes:", error);
                });
        }
    }, [currentUser, userToken, currentPage]);

    return (
        <div className="flex flex-col">
            <h1 className="font-bold mb-5 text-xl">All  Items</h1>
            <div className=" hidden md:block">
                <table className="min-w-full  border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 font-sans">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Bid Price</th>
                            <th className="border border-gray-300 px-4 py-2">Current Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length !== 0 && sales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={sale.objet.image} alt={sale.objet.titre} className="w-10 h-10 object-cover text-center" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{sale.objet.titre}</td>
                                <td className="border border-gray-300 px-4 py-2 font-semibold text-red-800">${sale.prix}</td>
                                <td className="border border-gray-300 px-4 py-2 font-semibold text-red-800">${sale.objet.prixActuel}</td>
                                <td className={`border border-gray-300 px-4 py-2  font-semibold ${sale.objet.etat === 'en_cours' ? '' : sale.objet.etat === 'termine' && sale.prix >= sale.objet.prixActuel ? 'text-green-600' : 'text-red-600'}`}>
                                    {sale.objet.etat === 'en_cours' ? sale.objet.etat : sale.objet.etat === 'termine' && sale.prix >= sale.objet.prixActuel ? 'Win' : 'Cancel'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to="/preview" className=" text-slate-950 py-2 no-underline hover:underline px-4 rounded-md hover:bg-slate-950 hover:text-slate-50 border border-black">
                                        Preview
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden">
                {sales.length !== 0 && sales.map((sale) => (
                    <div key={sale.id} className="border border-gray-200 rounded-md p-4 mb-4 shadow-md">
                        <div className="flex flex-col space-y-2">
                            <img src={sale.objet.image} alt={sale.objet.titre} className="w-20 h-20 object-cover mx-auto" />
                            <div>
                                <strong>Title:</strong> {sale.titre}
                            </div>
                            <div className="font-semibold ">
                                <strong>Bid Price:</strong> <span className="text-red-800">${sale.prix}</span>
                            </div>
                            <div className="font-semibold  ">
                                <strong className="">Actual Price:</strong><span className="text-red-800"> ${sale.objet.prixActuel}</span>
                            </div>
                            <div className="font-semibold  ">
                                <strong className="">Status:</strong>
                                <span className={`font-semibold ${sale.objet.etat === 'en_cours' ? '' : sale.objet.etat === 'termine' && sale.prix > sale.objet.prixActuel ? 'text-green-600' : 'text-red-600'}`}>
                                    {sale.objet.etat === 'en_cours' ? sale.objet.etat : sale.objet.etat === 'termine' && sale.prix > sale.objet.prixActuel ? 'Win' : 'Cancel'}
                                </span>
                            </div>
                            <div>
                                <Link to="/preview" className=" text-slate-950 py-2 no-underline hover:underline px-4 rounded-md hover:bg-slate-950 hover:text-slate-50 border border-black">
                                    Preview
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination buttons */}
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
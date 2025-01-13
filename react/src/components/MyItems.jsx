import { useEffect, useState } from "react";
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { Link, Navigate } from "react-router-dom";



export default function MyItems() {
    const { userToken, currentUser } = userStateContext();
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            axiosClient.get(`/sales/${currentUser.id}?page=${currentPage}`, {
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
            <h1 className="font-bold mb-5 text-xl">All Posted Items</h1>
            <div className=" hidden md:block">
                <table className="min-w-full  border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 font-sans">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Current Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length !== 0 && sales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={sale.image} alt={sale.title} className="w-10 h-10 object-cover text-center" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 ">{sale.titre}</td>
                                <td className="border border-gray-300 px-4 py-2 font-bold text-red-800">${sale.prixActuel}</td>
                                <td className={`border border-gray-300 px-4 py-2 ${sale.etat === 'termine' ? 'text-green-600' : 'text-red-600'}`}>
                                    {sale.etat}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to="/preview" className="bg-white py-2 px-4 rounded-md hover:bg-black hover:text-white border hover:underline border-black">
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
                            <img src={sale.image} alt={sale.title} className="w-20 h-20 object-cover mx-auto" />
                            <div>
                                <strong> Title:</strong> {sale.titre}
                            </div>
                            <div>
                                <strong>Price:</strong> <span className="text-red-800 font-bold">${sale.prixActuel} </span>
                            </div>
                            <div>
                                <strong>Status:</strong>
                                <span className={sale.etat === 'termine' ? 'text-green-600' : 'text-red-600'}>
                                    {sale.etat}
                                </span>
                            </div>
                            <div>
                                <Link to="/preview" className="bg-white py-2 px-4 rounded-md hover:bg-black hover:text-white border hover:underline border-black">
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

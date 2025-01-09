import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Objet from "../components/Objet";
import Banner from "../components/Banner";
import { Footer } from "../components/Footer";
import { userStateContext } from "../contexts/ContextProvider";

export default function Preview() {
    const {currentUser}=userStateContext();
    const [objets, setObjets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    // Fetch objects from the server
    const fetchObjets = () => {
        // Inclure le terme de recherche et la page dans la requête
        fetch(`http://127.0.0.1:8000/objets?page=${page}&search=${searchTerm}&id=${currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                setObjets(data.data);
                setTotalPages(data.last_page);
            })
            .catch((error) => console.log("Erreur lors de la récupération des objets: ", error));
    };

    // Fetch objects when page or searchTerm changes
    useEffect(() => {
        fetchObjets();
    }, [page, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Met à jour le terme de recherche
        setPage(1); // Réinitialise à la première page lors de la recherche
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage); // Change de page
        }
    };

    return (
        <>
            <Navbar SearchTerm={searchTerm} handleSearch={handleSearch}></Navbar>
            <Banner></Banner>
            <div className="mx-10 mt-10">
                <div className="flex mt-2 flex-wrap gap-x-10 justify-center">
                    {objets.map((objet) => (
                        <div key={objet.id}>
                            <Objet objet={objet}></Objet>
                        </div>
                    ))}
                </div>
                <div className="pagination mt-4 flex justify-around items-center gap-4 border border-gray-300 rounded-sm py-4 mb-5 mx-auto w-[70%]">
                    {/* Previous Page Button */}
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="pagination-button px-4 py-2 text-black bg-white hover:bg-black border rounded-sm border-gray-300 hover:text-white"
                    >
                        &lt; PREV
                    </button>

                    <div className="flex gap-1">
                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-2 rounded-full ${page === pageNum
                                        ? "bg-black text-white"
                                        : "bg-gray-200 text-black"
                                    }`}
                            >
                                {pageNum < 10 ? `0${pageNum}` : pageNum}
                            </button>
                        ))}
                    </div>

                    {/* Next Page Button */}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="pagination-button px-4 py-2 bg-white text-black hover:bg-black hover:text-white border border-gray-300 rounded-sm disabled:opacity-50"
                    >
                        NEXT &gt;
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

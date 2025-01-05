import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Objet from "../components/Objet";

export default function Preview() {
    const [objets, setObjets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/objets?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setObjets(data.data);
                setTotalPages(data.last_page)
            })
            .catch((error) => console.log("Erreur lors de la récupération des objets: ", error));
    }, [page])
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <>
            <Navbar></Navbar>
            <div className="flex mt-2 flex-wrap gap-x-10">
                {objets.map((objet) => (
                    <div key={objet.id}>
                        <Objet objet={objet}></Objet>
                    </div>
                )
                )}
            </div>
            <div className="pagination mt-4 flex justify-around items-center gap-4 border border-gray-300  rounded-sm py-1 mb-5">
                {/* Bouton de page précédente */}
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="pagination-button px-4 py-2 text-black bg-white hover:bg-black border rounded-sm border-gray-300 hover:text-white  "
                >
                    &lt; PREV
                </button>

                <div className="flex gap-1">
                    {/* Pages numérotées */}
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

                {/* Bouton de page suivante */}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="pagination-button px-4 py-2 bg-white text-black hover:bg-black hover:text-white border border-gray-300 rounded-sm disabled:opacity-50"
                >
                    NEXT &gt;
                </button>
            </div>
        </>
    )
}
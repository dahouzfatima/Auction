import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Objet from "../components/Objet";

export default function Preview() {
    const [objets, setObjets] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/objets`)
            .then((response) => response.json())
            .then((data) => setObjets(data))
            .catch((error) => console.log("Erreur lors de la récupération des objets: ", error));
    }, [objets])
    return (
        <>
            <Navbar></Navbar>
            <div className="flex mt-2 flex-wrap gap-x-4">
                {objets.map((objet) => (
                    <div key={objet.id}>
                        <Objet objet={objet}></Objet>
                    </div>
                )
                )}
            </div>
        </>
    )
}
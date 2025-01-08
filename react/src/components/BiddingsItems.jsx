import { useEffect, useState } from "react";

export default function BiddingItems() {
    const [user, setUser] = useState(null);
    const [ventes, setVentes] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si vous utilisez Sanctum
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user);
                setVentes(data.ventes);
            })
            .catch((error) => console.log("Erreur lors de la récupération des donnnees: ", error));
    }, [])
    return (
        <>
            <div>
                <h1>Bienvenue, {user.firstName} {user.lastName}!</h1>

                <h2>Vos Ventes :</h2>
                <ul>
                    {ventes.length > 0 ? (
                        ventes.map(vente => (
                            <li key={vente.id}>{vente.nom} - {vente.prix}€</li>
                        ))
                    ) : (
                        <li>Aucune vente trouvée.</li>
                    )}
                </ul>
            </div></>
    )
}
import { useEffect, useState } from "react";

export default function BiddingItems() {
    const {}
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
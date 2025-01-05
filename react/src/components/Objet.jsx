import { useEffect, useState } from "react"

export default function Objet({ objet }) {
    const [timeLeft, setTimeLeft] = useState("")
    useEffect(() => {
        // Fonction pour calculer le temps restant
        const calculateTimeLeft = () => {
            const now = new Date(); // Date actuelle
            const endDate = new Date(objet.dateFin); // Date de fin
            const diff = endDate - now; // Différence en millisecondes

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft(`${days}D : ${hours}H : ${minutes}M : ${seconds}Sec`);
            } else {
                setTimeLeft("Auction Ended"); // Si la date est dépassée
            }
        };

        // Mettre à jour toutes les secondes
        const timer = setInterval(calculateTimeLeft, 1000);

        // Nettoyer l'intervalle lorsqu'on quitte le composant
        return () => clearInterval(timer);
    }, [objet.dateFin])
    return (

        <>
            <div class="bg-white shadow-sm relative overflow-hidden w-[300px] ">
                <img src={objet.image} alt="Item Image" class="w-full h-64 object-cover" />
                <div className="bg-white text-center absolute py-4 px-7 rounded-md top-[230px] left-[45px] mx-auto font-semibold shadow-md">
                    {timeLeft}
                </div>
                <div class="p-4 mt-5">
                    <h3 class="font-semibold text-lg">{objet.titre}</h3>
                    <p class="text-gray-500 mt-2">{objet.description}</p>
                    <div class="mt-4 flex  items-center">
                        <span className=" text-gray-500 mr-2">Current Bidding:</span><span class="font-semibold text-xl">{objet.prixActuel}$</span>
                    </div>
                    <div className=" flex ">
                        <button class="bg-white text-black py-2 px-4 mt-5   border border-black rounded hover:bg-black hover:text-white ">Start a Bid</button>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer l'ID de l'objet depuis l'URL
import { userStateContext } from '../contexts/ContextProvider';
import axiosClient from "../axios";

const ObjetDetails = () => {
    const { userToken, currentUser } = userStateContext();
    const { id } = useParams(); // Récupère l'ID de l'objet depuis l'URL
    const [objet, setObjet] = useState(null); // Stocke les données de l'objet
    const [bid, setBid] = useState(0); // Stocke la valeur actuelle de l'enchère entrée par l'utilisateur
    const [timeLeft, setTimeLeft] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

    // Fonction pour récupérer les détails de l'objet depuis le backend
    const fetchObjetDetails = async () => {
        axiosClient.get(`/objets/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then(({ data }) => {
                setObjet(data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des ventes:", error);
            });
    };

    // Appeler fetchObjetDetails lors du montage du composant
    useEffect(() => {
        fetchObjetDetails();
    }, [id]);
    useEffect(() => {
        // Fonction pour calculer le temps restant
        if (objet && objet.dateFin) {
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
            setBid(objet.prixActuel + 1);
            // Mettre à jour toutes les secondes
            const timer = setInterval(calculateTimeLeft, 1000);

            // Nettoyer l'intervalle lorsqu'on quitte le composant
            return () => clearInterval(timer);
        }
    }, objet)

    // Fonction pour placer une enchère
    const placeBid = async () => {
        const currentDate = new Date().toISOString(); // Date actuelle au format ISO

        try {
            const response = await axiosClient.post(
                `/objets/${id}/bid`, // Endpoint relatif
                {
                    prix: bid,
                    prop_id: currentUser.id, // Utilisez l'ID de l'utilisateur actuel
                    objet_id: id, // ID de l'objet
                    date: currentDate, // Date actuelle
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`, // Token utilisateur
                    },
                }
            );

            // Si la requête réussit
            alert('Votre enchère a été placée avec succès !');
            setObjet({ ...objet, prixActuel: bid }); // Met à jour le prix localement
        } catch (error) {
            console.error("Erreur lors du placement de l'enchère:", error);
            alert(error.response?.data?.message || "Une erreur s'est produite.");
        }
    };

    const handleBidChange = (e) => {
        const newBid = parseFloat(e.target.value);
        setBid(newBid);
        if (newBid < objet.prixActuel) {
            setErrorMessage("Le prix saisi ne peut pas être inférieur au prix actuel.");
        } else {
            setErrorMessage(""); // Réinitialisez le message d'erreur
        }

        setBid(newBid);
    };

    // Vérification si l'objet est chargé
    if (!objet) {
        return <p>Chargement...</p>;
    }
    const formatDateWithAt = (dateString) => {
        const date = new Date(dateString);

        const options = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat('en-FR', options).format(date);

        return formattedDate.replace(',', ' at'); // Ajoute "at" au format
    };

    return (
        <div className="p-8 text-black bg-white min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={objet.image}
                        alt={objet.titre}
                        className="w-full max-w-md rounded-lg shadow-md"
                    />
                    <div className="flex space-x-4 mt-4">
                        {objet.images && objet.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-md border border-gray-500"
                            />
                        ))}
                    </div>
                </div>

                {/* Section Détails */}
                <div>
                    <h1 className="text-4xl font-bold">{objet.titre}</h1>
                    <p className="text-lg mt-4">{objet.description}</p>
                    <p className="mt-2 ">
                        <span className='text-[#515050] text-lg'>Adresse: </span>
                        {objet.address || 'Non spécifiée'}
                    </p>

                    {/* Prix */}
                    <div className="">
                        <p>
                            <span className='text-[#515050] text-lg'>Prix initial: </span>
                            {objet.prixInitial.toFixed(2)} $
                        </p>
                        <p>
                            <span className='text-[#515050] text-lg'>Prix actuel: </span> {objet.prixActuel.toFixed(2)} $
                        </p>
                    </div>



                    {/* Placer une enchère */}
                    <div className="mt-6">
                        <div className="flex items-center mt-4">
                            <button className='w-10 h-10 bg-black text-white rounded  mr-2'
                                onClick={() => setBid((prevBid) => (prevBid > objet.prixActuel + 1 ? prevBid - 1 : prevBid))}
                            >-</button>
                            <input
                                type="number"
                                value={bid}
                                onChange={handleBidChange}
                                className="border border-gray-600 p-2 rounded-md w-24  text-black"
                            />
                            <button className='w-10 h-10 bg-black text-white rounded mr-2 ml-2'
                                onClick={() => setBid((prevBid) => prevBid + 1)}>+</button>
                            <button
                                onClick={placeBid}
                                disabled={!!errorMessage} // Désactivez le bouton en cas d'erreur
                                className={` transition-all  duration-400 underline border  border-1 border-black px-4 py-2 rounded-md ${errorMessage
                                    ? "bg-gray-400 text-black cursor-not-allowed "
                                    : " hover:bg-black hover:text-white"
                                    }`}

                            >
                                Placer l'enchère
                            </button>

                        </div>
                        {errorMessage && (
                            <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
                        )}
                    </div>
                    <div className='mt-4 '>
                        <div className='flex flex-row  items-center align-center'>
                            <button className='w-8 mr-4 '><span class="material-symbols-outlined text-[20px] font-extralight rounded-full border-1 flex justify-center items-center w-8 h-8 mr-4 hover:bg-black hover:text-white transition-all duration-400 cursor-pointer">favorite</span></button>
                            <div className='text-[#515050] '>Ajouter au favorite</div>
                        </div>
                    </div>
                    <div>
                        <div className='mt-3 text-[#515050]'>
                            L'enchère sera terminée dans
                        </div>
                        <div className="bg-white text-center  py-4 px-7 rounded-md  mx-auto  text-2xl  shadow-md">
                            {timeLeft}
                        </div>
                        <div className='mt-2'>
                            <span>Ending: </span> {formatDateWithAt(objet.dateFin)}
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default ObjetDetails;
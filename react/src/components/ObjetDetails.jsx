import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer l'ID de l'objet depuis l'URL
import { userStateContext } from '../contexts/ContextProvider';
import axiosClient from "../axios";
import Pusher from "pusher-js";


const ObjetDetails = () => {


    const { userToken, currentUser } = userStateContext();
    const { id } = useParams(); // Récupère l'ID de l'objet depuis l'URL
    const [objet, setObjet] = useState(null); // Stocke les données de l'objet
    const [bid, setBid] = useState(0); // Stocke la valeur actuelle de l'enchère entrée par l'utilisateur

    const [timeLeft, setTimeLeft] = useState("");
    const [timeLeftStart, setTimeLeftStart] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur
    const [etat, setEtat] = useState("");
    const [showModal, setShowModal] = useState(false); 



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
        Pusher.logToConsole = true;
    
        const pusher = new Pusher("a636b18912ce29b6e934", {
          cluster: "ap2",
        });
    
        const channel = pusher.subscribe(`enchere.${id}`);
    
        channel.bind("EncherePlaced", (data) => {
            console.log(data); 
        });
    
        // Nettoyer l'abonnement lors du démontage du composant
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, [id]);
    
    useEffect(() => {
        if (objet) {
            setBid(objet.prixActuel);
            setEtat(objet.etat);
        }
    }, [objet])

    useEffect(() => {
        // Fonction pour calculer le temps restant
        if (objet && objet.dateFin) {
            setEtat(objet.etat);
            console.log(objet.etat);
            const calculateTimeLeft = () => {
                const now = new Date(); // Date actuelle
                const endDate = new Date(objet.dateFin); // Date de fin
                const startDate = new Date(objet.dateDepart);
                console.log(startDate);
                const diff = endDate - now; // Différence en millisecondes
                console.log(diff)
                const diffUpcoming = startDate - now;
                console.log(diffUpcoming);
                if (diffUpcoming > 0) {
                    const days = Math.floor(diffUpcoming / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diffUpcoming / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diffUpcoming / 1000 / 60) % 60);
                    const seconds = Math.floor((diffUpcoming / 1000) % 60);
                    console.log("herrrreeeeee");
                    setTimeLeftStart(`${days}D : ${hours}H : ${minutes}M : ${seconds}Sec`);
                }
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
    }, [objet])

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
                        Authorization: ` Bearer ${userToken}`, // Token utilisateur
                    },
                }
            );

            // Si la requête réussit
            setShowModal(true);
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
            setBid(newBid);

        }

    };

    // Vérification si l'objet est chargé
    if (!objet) {
        return <p>Loading...</p>;
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
            {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
                        <div className="relative  w-full max-w-md h-auto bg-white rounded-lg shadow-md">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button
                                    type="button"
                                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setShowModal(false)} // Close the modal on button click
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <p className="mb-4 text-lg font-semibold text-gray-900">Successfully placed bid!</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="py-2 px-3 text-sm font-medium text-center border border-black text-black hover:bg-slate-400 rounded-lg bg--600 hover:bg-primary-700 "
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={objet.image}
                        alt={objet.titre}
                        className="w-full h-[550px] max-w-md rounded-lg shadow-md"
                    />
                  
                </div>

                {/* Section Détails */}
                <div>
                    <h1 className="text-4xl font-bold">{objet.titre}</h1>
                    <p className="text-lg mt-4">{objet.description}</p>
                    <p className="mt-2 ">
                        <span className='text-[#515050] text-lg'>Address: </span>
                        {objet.address || 'Non spécifiée'}
                    </p>

                    {/* Prix */}
                    <div className="">
                        <p>
                            <span className='text-[#515050] text-lg'>Initial price: </span>
                            {objet.prixInitial.toFixed(2)} $
                        </p>
                        <p>
                            <span className='text-[#515050] text-lg'>Actuel price: </span> {objet.prixActuel.toFixed(2)} $
                        </p>
                    </div>



                    {/* Placer une enchère */}
                    <div className="mt-6">
                        <div className="flex items-center mt-4">
                            <button className={`w-10 h-10  hover:bg-black bg-black hover:text-white text-white rounded  mr-2 ${etat === "en_attente"
                                ? " cursor-not-allowed "
                                : " "
                                }`}
                                disabled={etat === "en_attente"}
                                onClick={() => setBid((prevBid) => (prevBid > objet.prixActuel + 1 ? prevBid - 1 : prevBid))}
                            >-</button>
                            <input
                                type="number"
                                value={bid}
                                onChange={handleBidChange}
                                className="border border-gray-600 p-2 rounded-md w-24  text-black"
                                disabled={etat === "en_attente"}
                            />
                            <button className={`w-10 h-10 hover:bg-black bg-black text-white rounded  mr-2 ml-2 ${etat === "en_attente"
                                ? " cursor-not-allowed "
                                : "  "
                                }`}
                                disabled={etat === "en_attente"}
                                onClick={() => setBid((prevBid) => prevBid + 1)}>+</button>

                            <button
                                onClick={placeBid}
                                disabled={!!errorMessage || etat === "en_attente"} // Désactivez le bouton en cas d'erreur
                                className={` transition-all  duration-400 underline border  border-1 border-black px-4 py-2 rounded-md ${errorMessage || etat === "en_attente"
                                    ? "bg-gray-400 text-black cursor-not-allowed "
                                    : " hover:bg-black hover:text-white"
                                    }`}

                            >
                                Place a bid
                            </button>

                        </div>
                        {errorMessage && (
                            <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
                        )}
                    </div>
                    {etat === "en_cours" && (
                        <div>
                            <div className='mt-3 text-[#515050]'>
                                The bid will   <strong>end </strong> in:
                            </div>
                            <div className="bg-white text-center  py-4 px-7 rounded-md  mx-auto  text-2xl  shadow-md">
                                {timeLeft}
                            </div>
                            <div className='mt-2'>
                                <span>Ending: </span> {formatDateWithAt(objet.dateFin)}
                            </div>
                        </div>
                    )}
                    {etat === "en_attente" && (
                        <div>
                            <div className='mt-3 text-[#515050]'>
                                The bid will <strong>start</strong> in:
                            </div>
                            <div className="bg-white text-center  py-4 px-7 rounded-md  mx-auto  text-2xl  shadow-md">
                                {timeLeftStart}
                            </div>

                        </div>
                    )}

                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default ObjetDetails;
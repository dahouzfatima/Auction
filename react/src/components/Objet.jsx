import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { userStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function Objet({ objet }) {
    const { currentUser, userToken } = userStateContext();
    const [timeLeft, setTimeLeft] = useState("");
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [etat, setEtat] = useState(objet.etat);
    const checkIfInWishlist = async () => {
        axiosClient.get('/wishlist', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then(({ data }) => {
                console.log("Wishlist items:", data);
                const wishlistItems = data;
                const isInWishlist = wishlistItems.some(item => item.id === objet.id);
                setIsInWishlist(isInWishlist);
            }).catch((error) => {
                console.error("Erreur lors de la récupération du wishlist:", error);
            });

    };
    useEffect(() => {
        checkIfInWishlist();
    }, [objet.id, userToken])
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endDate = new Date(objet.dateFin);
            const diff = endDate - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft(`${days}D : ${hours}H : ${minutes}M : ${seconds}Sec`);
            } else {
                setTimeLeft("Auction Ended");
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [objet.dateFin])
    const handleWishlistClick = async () => {
        try {
            const response = await axiosClient.post(
                '/wishlist',
                { objet_id: objet.id },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsInWishlist(false);
            } else if (response.status === 201) {
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <>
            <div class="bg-white shadow-sm relative overflow-hidden w-[300px] mx-auto ">
                <img src={objet.image} alt="Item Image" class="w-full h-64 object-cover" />
                {objet.etat === 'en_cours' && (
                    <span className="absolute top-2 left-0 bg-red-600 text-white px-3 py-1 rounded-r-md text-sm">
                        Live
                    </span>
                )}
                {objet.etat === 'en_attente' && (
                    <span className="absolute top-2 left-0 bg-green-500 text-white px-3 py-1 rounded-r-md text-sm">
                        Upcoming
                    </span>
                )}
                <button
                    className={`absolute top-2 right-2 bg-white p-1 rounded-full shadow-md flex justify-center items-center transition duration-200 ease-in-out
                        ${isInWishlist ? 'text-red-600' : ''}`}
                    onClick={handleWishlistClick}
                >
                    <i className="bx bxs-heart mx-auto rounded-full font-extralight hover:text-red-600 text-xl"></i>
                </button>
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
                        <Link to={`/details/${objet.id}`} >
                            <button class="bg-white text-black py-2 px-4 mt-5   border border-black rounded hover:bg-black hover:text-white ">Start a Bid</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
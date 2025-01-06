import React from "react";

const Banner = () => {
    return (
        <div
            className="relative flex flex-col justify-center text-center h-[400px] text-white bg-cover"
            style={{
                backgroundImage:
                    "url('https://kpmglearningmalta.com/wp-content/uploads/2020/07/2641556-scaled.jpg')",
                backgroundPosition: "bottom", // Positionne l'image pour montrer la partie inférieure
            }}
        >

            {/* Content */}
            <div className="z-1 left-0 absolute font-light  text-left ml-10 font-serif">
                <h1 className="text-6xl  mb-4 font-bold">Auction Catalog</h1>
                <p className="text-lg max-w-2xl font-sans">
                    An auction catalog is a curated collection of items available for bidding, showcasing unique assets, collectibles, or valuables, tailored to attract buyers and reflect the diversity of the auction.
                </p>
            </div>


        </div>
    );
};

export default Banner;

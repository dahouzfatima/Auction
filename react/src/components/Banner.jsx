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
                <h1 className="text-6xl  mb-4 font-bold">Art Catalog</h1>
                <p className="text-lg max-w-2xl font-sans">
                    An art catalog is a curated assembly of artworks gathered by an
                    individual, institution, or group, often reflecting the collector's
                    interests, tastes, or a specific theme.
                </p>
            </div>


        </div>
    );
};

export default Banner;

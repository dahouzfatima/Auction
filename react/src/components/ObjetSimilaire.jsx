import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Importation des modules
import Objet from './Objet';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './fleche.css'

const ObjetSimilaire = () => {
  const [objets2, setObjets2] = useState([]);
    //http://127.0.0.1:8000/objets/similaire/{$id}
  // Fonction pour récupérer les objets depuis le backend
  

  // Appel de la fonction fetchObjets au montage du composant
  useEffect(() => {
    fetch('http://127.0.0.1:8000/latest') // Remplacez l'URL par la vôtre
    .then((response) => response.json())
    .then((data) => setObjets2(data))
    .catch((error) => console.log('Erreur lors de la récupération des objets: ', error));
  }, []);
  return (
    <section className="mx-auto relative ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Discover other bids you may like!</h2>
     
        <Swiper className=''
          modules={[Navigation, Autoplay]} // Inclure le module Autoplay
          navigation
          autoplay={{
            delay: 3000, // Délai de 3 secondes entre chaque slide
            disableOnInteraction: false, // L'autoplay ne sera pas arrêté après interaction
          }}
          spaceBetween={30} // Espacement entre les slides
          slidesPerView={4} // Nombre de slides visibles
          breakpoints={{
            350: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4},
          }}
        >
          {objets2.map((objet) => (
            objet.etat !== 'termine' ? (
              <SwiperSlide key={objet.id} className="">
                <div className="swiper-slide-content">
                  <Objet objet={objet} />
                </div>
              </SwiperSlide>
            ) : null
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ObjetSimilaire;
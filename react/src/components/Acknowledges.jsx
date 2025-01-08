import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Add Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Acknowledges = () => {
  const testimonials = [
    {
      title: "Wonderful Bidding Deal",
      quote:
        "I purchased a beautiful painting from this site, and the quality is incredible. The buying process was seamless, and the delivery was prompt. Highly recommend for anyone looking to buy unique art.",
      author: "Mr. Abid",
      role: "Exhibition Manager",
      date: "Jan 20, 2024",
      time: "10:30 PM",
      image: 'profile_image.jpg',
    },
    {
      title: "Excellent Item for Auctions!",
      quote:
        "I purchased a beautiful painting from this site, and the quality is incredible. The buying process was seamless, and the delivery was prompt. Highly recommend for anyone looking to buy unique art.",
      author: "Mr. Berrada",
      role: "Art Teacher",
      date: "Jul 10, 2024",
      time: "12:25 PM",
      image: 'profile_image.jpg',
    },
    {
      title: "Amazing Bidding Items!",
      quote:
        "I purchased a beautiful painting from this site, and the quality is incredible. The buying process was seamless, and the delivery was prompt. Highly recommend for anyone looking to buy unique art.",
      author: "Ahmed Chawqi",
      role: "Artist",
      date: "Aug 23, 2024",
      time: "12:25 PM",
      image: 'profile_image.jpg',
    },
    {
        title: "Amazing Bidding Items!",
        quote:
          "I purchased a beautiful painting from this site, and the quality is incredible. The buying process was seamless, and the delivery was prompt. Highly recommend for anyone looking to buy unique art.",
        author: "Ahmed Chawqi",
        role: "Artist",
        date: "Aug 23, 2024",
        time: "12:25 PM",
        image: 'profile_image.jpg',
    },
    {
        title: "Amazing Bidding Items!",
        quote:
          "I purchased a beautiful painting from this site, and the quality is incredible. The buying process was seamless, and the delivery was prompt. Highly recommend for anyone looking to buy unique art.",
        author: "Ahmed Chawqi",
        role: "Artist",
        date: "Aug 23, 2024",
        time: "12:25 PM",
        image: 'profile_image.jpg',
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Client Acknowledgment</h2>
        <p className="text-center text-gray-600 mb-12">
          Join us for an exhilarating live auction experience where art meets excitement.
        </p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Include Autoplay module
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // Delay in milliseconds (3 seconds)
            disableOnInteraction: false, // Autoplay will not stop when user interacts
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between h-full m-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{testimonial.title}</h3>
                  <p className="text-gray-500 italic mb-6">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover object-top   mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mt-4">
                  {testimonial.date} <br />
                  {testimonial.time}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Acknowledges;
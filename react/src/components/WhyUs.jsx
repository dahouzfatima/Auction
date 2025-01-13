import React from 'react';

const WhyUs = () => {
  return (
    <div className=" relative  text-white  mt-6 ">
      <div className=" w-full pt-2  bg-black text-white mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center ">
        {/* Left Section */}
        <div className="lg:w-2/3 text-justify">
          <h2 className="text-4xl font-bold mb-4">What Makes Us Special</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            An unparalleled art auction experience where quality, integrity, and passion for art come together.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/handshake.png"
                  alt="Support Artists"
                  className="h-8 w-8 "
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Support Artists</h3>
                <p className="text-gray-400">
                  Supporting their creative endeavors to continue producing extraordinary works.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/safe.png"
                  alt="Secure Transactions"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-4 ">
                <h3 className="text-lg font-semibold">Secure Transactions</h3>
                <p className="text-gray-400">
                   Empowering Confidence with Every Secure Transaction                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/smartphone.png"
                  alt="User-Friendly Platform"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-4 ">
                <h3 className="text-lg font-semibold">User-Friendly Platform</h3>
                <p className="text-gray-400">
                  Our website is designed for ease of use.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/link.png"
                  alt="Seamless Experience"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-4 ">
                <h3 className="text-lg font-semibold">Seamless Experience</h3>
                <p className="text-gray-400">
                We connect collectors with arts from around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="  lg:w-1/3 mt-8 lg:-mt-5">
          <img
            src="frida_whyUs.jpg" 
            alt="Artwork"
            className=" shadow-lg h-[100vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
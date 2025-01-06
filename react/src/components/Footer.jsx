export const Footer = () => {
    return (
      <footer className="bg-black text-gray-300">
        <div className="px-4 pt-16 mx-auto max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-10 row-gap-10 mb-8 lg:grid-cols-3">
            {/* Logo and Description */}
            <div>
              <h2 className="text-white text-2xl font-bold">BidThic</h2>
              <p className="mt-4 text-gray-400">
              Bidthic simplifies auctions, connecting buyers and sellers with ease. From rare items to high-value assets, we ensure a transparent and efficient bidding experience for all
              </p>
            </div>
  
            {/* Menu */}
            <div>
              <h3 className="text-white font-medium">Menu</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    Bids Historic
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    Pieces Catalog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    Departments
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h3 className="text-white font-medium">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    How to bid
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    How to sell
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 hover:text-teal-400"
                  >
                    F.A.Q
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Newsletter Subscription */}
          <div className="mt-10">
            <h3 className="text-white font-medium">
              For Exclusive Bids Updates Join Our Newsletter!
            </h3>
            <form className="flex flex-col mt-4 md:flex-row">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="flex-grow w-full h-12 px-4 mb-3 bg-white border border-gray-300 rounded shadow-sm md:mr-2 md:mb-0 focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 px-6 text-white bg-gray-500 rounded shadow-md hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
  
          {/* Footer Bottom */}
          <div className="flex flex-col justify-between pt-5 mt-10 border-t border-gray-800 sm:flex-row">
            <p className="text-sm text-gray-500">
              © Copyright 2024 BidThic.All rights reserved.
            </p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              {/* Social Media Icons */}
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
              >
                Facebook
              </a>
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
              >
                Instagram
              </a>
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
              >
                LinkedIn
              </a>
              <a
                href="/"
                className="text-gray-500 transition-colors duration-300 hover:text-teal-400"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
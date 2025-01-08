import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const FooterL = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">AuctionHere</h2>
          <p className="mt-4 text-justify">
            An Art Action Company typically operates in the space of live art,
            performance, and social practice, often combining elements of
            activism and community engagement.
          </p>
          <div className="flex space-x-4 mt-4">
          <a
              href="#"
              className="text-gray-400 hover:text-white transition no-underline"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition no-underline"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition no-underline"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition no-underline"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Menu Section */}
        <div className="flex flex-col items-start text-justify">
          <ul className="space-y-2 text-justify">
            <li>
                <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Artists Portfolio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Art Catalog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Departments
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col  text-justify ">
          <ul className="space-y-2 text-justify">
            <li>
                <p className="text-lg font-semibold text-white mb-4 ">Resources</p>
            </li>
            <li >
              <a
                href="#"
                className="hover:text-white transition no-underline "
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                How to Bid
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                How to Sell
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            For Exclusive Art Updates Join Our Newsletter!
          </h3>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              →
            </button>
          </form>
          
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            ©Copyright 2024 <span className="text-white">AuctionHere</span> | Design
            By Egens Lab
          </p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Support Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition no-underline"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterL;
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
} from '@headlessui/react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function NavbarL() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="text-black no-underline text-3xl font-bold">
            BidThic
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <ScrollLink
            to="banner"
            smooth={true}
            duration={500}
            className="text-sm font-semibold text-gray-900 no-underline cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="text-sm font-semibold text-gray-900 no-underline cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="auction-latest"
            smooth={true}
            duration={500}
            className="text-sm font-semibold text-gray-900 no-underline cursor-pointer"
          >
            New Auctions
          </ScrollLink>
          <ScrollLink
            to="why-us"
            smooth={true}
            duration={500}
            className="text-sm font-semibold text-gray-900 no-underline cursor-pointer"
          >
            Features
          </ScrollLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center gap-4">
            <Link to="/login" className="no-underline">
              <a className="text-sm font-semibold hover:underline text-gray-900 no-underline">
                Log in
              </a>
            </Link>
            <Link to="/signup" className="no-underline">
              <a className="text-sm font-semibold text-gray-900 border border-black rounded-full p-1 pr-3 pl-3 hover:bg-indigo-400 no-underline">
                Sign up
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">BidThic</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <ScrollLink
                  to="banner"
                  smooth={true}
                  duration={500}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </ScrollLink>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </ScrollLink>
                <ScrollLink
                  to="auction-latest"
                  smooth={false}
                  duration={200}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Auctions
                </ScrollLink>
                <ScrollLink
                  to="why-us"
                  smooth={true}
                  duration={500}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </ScrollLink>
                <br></br>
                <Link
                  to="/login"
                  smooth={true}
                  duration={500}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  smooth={true}
                  duration={500}
                  className="block no-underline rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

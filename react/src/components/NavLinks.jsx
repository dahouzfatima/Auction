import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./MyLinks";

const NavLinks = () => {
    const [heading, setHeading] = useState("");

    return (
        <>
            {links.map((link) => (
                <div key={link.name}>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <h1
                            className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
                            onClick={() => {
                                heading !== link.name ? setHeading(link.name) : setHeading("");
                            }}
                        >
                            {link.name}
                            <span className="text-xl md:hidden inline">
                                <ion-icon
                                    name={`${heading === link.name ? "chevron-up" : "chevron-down"
                                        }`}
                                ></ion-icon>
                            </span>
                            <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                                <ion-icon name="chevron-down"></ion-icon>
                            </span>
                        </h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                    <div className="py-3">
                                        <div
                                            className="w-4 h-4 left-3 absolute 
                    mt-1 bg-white rotate-45"
                                        ></div>
                                    </div>
                                    <div className="bg-white p-5 grid grid-cols-1 gap-3">
                                        {link.sublinks.map((sublink) => (
                                            <li key={sublink.name} className="text-sm text-gray-600 my-2.5">
                                                <Link to={sublink.link} className="hover:text-primary">
                                                    {sublink.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Mobile menus */}
                    <div
                        className={`${heading === link.name ? "md:hidden" : "hidden"
                            }`}
                    >
                        {link.submenu &&
                            link.sublinks.map((sublink) => (
                                <li key={sublink.name} className="py-3 pl-14">
                                    <Link to={sublink.link}>{sublink.name}</Link>
                                </li>
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default NavLinks;

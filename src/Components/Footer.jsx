import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-yellow-400 py-10 px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <Link to="/" className="text-3xl font-extrabold tracking-wide">
                        OurDhaka
                    </Link>
                    <p className="text-sm mt-2 text-yellow-300">
                        Building a better Dhaka, one issue at a time.
                    </p>
                </div>
                <div>
                    {/* Center - Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-lg font-semibold">
                        <a
  href="https://www.facebook.com/sadia.smrity.977323"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-white transition"
>
                            <img src="/fb.avif" className="h-10 rounded-full"/>
                        </a>
                        <NavLink
                            to="/https://x.com"
                            className="hover:text-white transition"
                        >
                            <img src="twitter.avif" className="h-10 rounded-full"/>
                        </NavLink>
                        <NavLink
                            to="/https://www.linkedin.com"
                            className="hover:text-white transition"
                        >
                            <img src="/in.avif" className="h-10 rounded-xl"/>
                        </NavLink>
                        <NavLink
                            to="/https://www.instagram.com"
                            className="hover:text-white transition"
                        >
                            <img src="insta.webp" className="h-10"/>
                        </NavLink>
                    </div>
                </div>

            </div>

            {/* Bottom line */}
            <div className="border-t border-yellow-700 mt-8 pt-4 text-center text-sm text-yellow-500">
                © {new Date().getFullYear()} OurDhaka. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

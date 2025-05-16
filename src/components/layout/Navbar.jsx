"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = ({ brandName, menuOptions }) => {
  const [isMobileMenu, setIsMobileMenu] = useState(false); //  state for screen width
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //   state for mobile menu open

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenu(window.innerWidth <= 640); // Phone screen width threshold
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-20 flex text-white bg-amber-400 justify-between p-7 opacity-80 fixed items-center shadow-xl">
      <h1 className="text-2xl text-gray-500 font-bold">{brandName}</h1>

      {isMobileMenu && (
        <>
          {!isMobileMenuOpen ? (
            <svg
              onClick={() => {
                // your custom logic here
                setIsMobileMenuOpen(true);
                console.log(isMobileMenuOpen);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <>
              <svg
                onClick={() => {
                  // your custom logic here
                  setIsMobileMenuOpen(false);
                  console.log(isMobileMenuOpen);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <div
                className={`
          absolute top-full right-0 w-[50%] bg-amber-400 h-[100vh] p-5 shadow-2xl  text-right z-10
          transform transition-all duration-300 ease-in-out origin-top-right
          ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
              >
                {" "}
                <ul className="flex flex-col gap-5 p-3">
                  {menuOptions.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${item.linkHref}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li> </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}

      {!isMobileMenu && (
        <div>
          <ul className="flex justify-around gap-5 items-center">
            {menuOptions.map((item, index) => (
              <li key={index}>
                <Link href={`/${item.linkHref}`} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}

            <li> </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

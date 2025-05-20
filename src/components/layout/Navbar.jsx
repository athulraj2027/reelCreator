"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/app/context/auth-context";

const Navbar = ({ brandName, menuOptions, loginOptions }) => {
  const router = useRouter();
  const [isMobileMenu, setIsMobileMenu] = useState(false); //  state for screen width
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //   state for mobile menu open
  const { isLoggedIn, logout, checkLogin } = useAuth();

  const logoutHandler = async () => {
    try {
      await axios.post("/api/logout");
      logout();
      router.replace("/");
      return;
    } catch (error) {
      console.log("error in logging out : ", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenu(window.innerWidth <= 640); // Phone screen width threshold
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize); // Update on resize
    checkLogin();
    return () => window.removeEventListener("resize", handleResize);
  }, [checkLogin]);

  return (
    <div className="w-full h-20 flex  text-gray-400 justify-around p-7 opacity-90 backdrop-blur-sm fixed shadow-xl items-center ">
      <Link href="/">
        <h1 className="text-2xl text-gray-500 font-bold">{brandName}</h1>
      </Link>
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
          absolute top-full right-0 w-[50%]  h-[100vh] p-5 shadow-2xl  text-right z-10
          transform transition-all duration-300 ease-in-out origin-top-right backdrop-blur-sm
          ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
              >
                {" "}
                {isLoggedIn ? (
                  <>
                    <ul className="flex flex-col gap-5 p-3">
                      {loginOptions.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={`/${item.linkHref}`}
                            className="hover:underline"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

                      <li>
                        <Button onClick={logoutHandler}>Logout</Button>
                      </li>
                    </ul>
                  </>
                ) : (
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
                  </ul>
                )}
              </div>
            </>
          )}
        </>
      )}

      {!isMobileMenu && (
        <div>
          {isLoggedIn ? (
            <>
              <ul className="flex justify-around gap-5 items-center">
                {loginOptions.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item.linkHref}`}
                      className="hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <Button onClick={logoutHandler}>Logout</Button>
              </ul>
            </>
          ) : (
            <ul className="flex justify-around gap-5 items-center">
              {menuOptions.map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.linkHref}`} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

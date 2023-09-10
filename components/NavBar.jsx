"use client"

import React, { useEffect, useState } from "react";
import SheetMenu from "@/components/SheetMenu";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";



const NavBar = () => {
  
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Function to update window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener when component mounts
    window.addEventListener("resize", updateWindowWidth);

    // Initialize window width
    updateWindowWidth();

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

      const { isSignedIn } = useAuth();

  return (
    <nav className="text-gray-200 w-full h-16 bg-teal-600 text-lg">
      <div className="flex justify-center gap-5 items-center h-16 pl-5 pr-5">
        <Link className="w-full" href={"/"}>
          <img src="/logo.png" alt="" className="w-24 h-12 " />
        </Link>

        {windowWidth && windowWidth > 768 && isSignedIn && (
          <nav className="flex gap-3 justify-end w-full">
            <ul className="flex gap-3 justify-end w-full">
              <li>
                <Link href={"/weight"}>Weight</Link>
              </li>
              <li>
                <Link href={"/bmi"}>BMI</Link>
              </li>
              <li>
                <Link href={"/water"}>Water</Link>
              </li>
              <li>
                <Link href={"/water"}>Nieco</Link>
              </li>
              <UserButton afterSignOutUrl="/"></UserButton>
            </ul>
          </nav>
        )}

        {!isSignedIn && (
          <div className="flex gap-3 justify-end w-full">
            <div className="flex items-center flex-col  justify-center  gap-x-2">
              <Link href={isSignedIn ? "/" : "/sign-up"}>
                <button className="rounded-full  text-white p-2 text-xl border  ">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}

        {windowWidth && windowWidth <= 768 && isSignedIn && <SheetMenu />}
      </div>
    </nav>
  );
};

export default NavBar;

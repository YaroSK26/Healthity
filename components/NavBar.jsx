"use client"

import React, { useEffect, useState } from "react";
import SheetMenu from "@/components/SheetMenu";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

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

  return (
    <nav className="text-gray-200 w-full h-16 bg-teal-600 text-lg">
      <div className="flex justify-center gap-5 items-center h-16 pl-5 pr-5">
        <Link className="w-full" href={"/"}>
          <img src="/logo.png" alt="" className="w-24 h-12 " />
        </Link>

        {windowWidth && windowWidth > 768 && (
          <div className="flex gap-3 justify-end w-[75rem]">
            <Link href={"/"}>aaaaaa</Link>
            <Link href={"/"}>bbbbb</Link>
            <Link href={"/"}>cccc</Link>
            <UserButton afterSignOutUrl="/"></UserButton>
          </div>
        )}

        {windowWidth && windowWidth <= 768 && <SheetMenu />}
      </div>
    </nav>
  );
};

export default NavBar;

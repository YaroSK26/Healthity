"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import {useState} from "react"

const SheetMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
      <button
        onClick={() => setIsMenuOpen(true)}
        className="text-white md:hidden p-4"
      >
        <Menu />
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 w-full h-full bg-teal-500 z-50 flex flex-col">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-6  text-white"
          >
            <X />
          </button>
          <nav className="flex flex-col items-center mt-5 gap-5">
            <ul className="flex flex-col gap-5 ml-5 justify-end w-full">
              <li>
                <Link href={"/weight"} onClick={() => setIsMenuOpen(false)}>
                  Weight
                </Link>
              </li>
              <li>
                <Link href={"/bmi"} onClick={() => setIsMenuOpen(false)}>
                  BMI
                </Link>
              </li>
              <li>
                <Link href={"/water"} onClick={() => setIsMenuOpen(false)}>
                  Water
                </Link>
              </li>
              <li>
                <Link href={"/journal"} onClick={() => setIsMenuOpen(false)}>
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href={"/bloodPressure"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pressure
                </Link>
              </li>
              <li>
                <Link
                  href={"/food-lobby"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tracker
                </Link>
              </li>
              <UserButton afterSignOutUrl="/"></UserButton>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default SheetMenu;

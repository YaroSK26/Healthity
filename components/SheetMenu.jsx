"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import {useState} from "react"

const SheetMenu = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const [menuButtonActive, setMenuButtonActive] = useState(false);

  return (
    <div>
      <Sheet open={isSheetOpen}>
        <SheetTrigger>
          <Menu
            onClick={() => {
              openSheet();
              setMenuButtonActive(true);
            }}
            className={`text-white md:hidden ${
              menuButtonActive ? "active" : ""
            }`}
          />
        </SheetTrigger>
        <SheetContent className="bg-teal-600 text-white w-full " side="right">
          <div className="flex justify-end ">
            <div
              onClick={closeSheet}
              className="w-7 h-7  z-10  bg-gray-200 font-bold  text-gray-900 flex justify-center items-center rounded-3xl"
            >
              X
            </div>
          </div>
          <nav className="flex gap-3 justify-end w-full mr-2">
            <ul className="flex flex-col gap-5 justify-end w-full">
              <li>
                <Link href={"/weight"} onClick={closeSheet}>
                  Weight
                </Link>
              </li>
              <li>
                <Link href={"/bmi"} onClick={closeSheet}>
                  BMI
                </Link>
              </li>
              <li>
                <Link href={"/water"} onClick={closeSheet}>
                  Water
                </Link>
              </li>
              <li>
                <Link href={"/journal"} onClick={closeSheet}>
                  Journal
                </Link>
              </li>
              <UserButton afterSignOutUrl="/"></UserButton>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetMenu;

"use client"

import {
  BookMarked,
  CupSoda,
  Radar,
  ScaleIcon,
  HeartPulse,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import Footer from "../../../../../components/Footer";

export default function Page() {
    

  return (
    <div className="w-full">
      <div className=" min-h-screen flex flex-wrap flex-col justify-center items-center  gap-10 mb-20 text-teal-500 ">
        <div className="flex gap-10">
          <ScaleIcon className="w-20 h-20"></ScaleIcon>
          <Radar className="w-20 h-20" />
          <CupSoda className="w-20 h-20"></CupSoda>
          <BookMarked className="w-20 h-20"></BookMarked>
          <HeartPulse className="w-20 h-20"></HeartPulse>
          <UtensilsCrossed className="w-20 h-20" />
        </div>
        <div className="flex items-center flex-col  justify-center  gap-x-2">
          <Link href={"/sign-up"}>
            <button className="rounded-full gradient text-white  p-2 text-3xl mb-1 ">
              Get Started
            </button>
          </Link>
          with our functions!
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

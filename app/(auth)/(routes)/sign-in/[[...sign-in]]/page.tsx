"use client"

import { useAuth } from "@clerk/nextjs";
import { BookMarked, CupSoda, Radar, ScaleIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
      const { isSignedIn } = useAuth();

  return (
    <div className="mt-20">
  
      <div className="grid sm:grid-cols-4 grid-cols-2  gap-10 mb-20 text-teal-500">
        <ScaleIcon className="w-20 h-20"></ScaleIcon>
        <Radar className="w-20 h-20" />
        <CupSoda className="w-20 h-20"></CupSoda>
        <BookMarked className="w-20 h-20"></BookMarked>
      </div>
      <div className="flex items-center flex-col  justify-center  gap-x-2">
        <Link href={isSignedIn ? "/" : "/sign-up"}>
          <button className="rounded-full gradient text-white p-2 text-3xl mb-1 ">
            Get Started
          </button>
        </Link>
        with our functions!
      </div>
    </div>
  );
}

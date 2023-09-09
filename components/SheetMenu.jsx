"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";


const SheetMenu = () => {
   

  return (
    <div>
      <Sheet>
        <SheetTrigger >
            <Menu className="text-white md:hidden"/>
          
        </SheetTrigger>
        <SheetContent className="bg-teal-600 text-white w-full" side="right">a</SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetMenu;

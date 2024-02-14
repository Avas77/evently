import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={"/assets/icons/menu.svg"}
            alt="Menu Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="bg-white flex flex-col gap-6 md:hidden">
          <SheetTitle>
            <Image
              src={"/assets/images/logo.svg"}
              alt="Evently Logo"
              width={128}
              height={38}
            />
          </SheetTitle>
          <Separator className="border-gray-50 border" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

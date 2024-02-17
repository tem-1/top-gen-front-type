import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";
import Link from "next/link";
import Navlinks from "./Navlinks";
import { ShoppingCart } from "lucide-react";
import LoginButton from "../LoginButton";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Cart from "./Cart";
import BestDiv from "../Layout/BestDiv";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from localStorage when component mounts
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  return (
    <nav className="bg-white">
      <div className="flex items-center justify-around">
        <div className="w-full flex justify-between pl-12 z-50 p-5 md:w-auto">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="md:cursor-pointer"
          />
          <div
            className="text-3xl md:hidden block"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <IoMdClose /> : <MdMenu />}
          </div>
        </div>
        <ul className="md:flex hidden items-center gap-8">
          <li>
            <Link href="/" className="py-7 px-3 inline-block">
              Нүүр
            </Link>
          </li>
          <Navlinks />
        </ul>
        <Cart />
        <div className="md:block hidden">
          {token ? (
            <Link href={"/profile"}>profile</Link>
          ) : (
            <Link href={"/login"}>
              <button
                type="button"
                className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init=""
              >
                Нэвтрэх
              </button>
            </Link>
          )}
        </div>
        {/* mobile menu */}
        <ul
          className={`md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${
            toggle ? "left-0" : "-left-[100%]"
          }`}
        >
          <li>
            <Link href="/" className="py-7 px-3  inline-block">
              Home
            </Link>
          </li>
          <Navlinks />
          <Button
            variant="outline"
            className={cn("border-[#00A1FF] text-[#00A1FF]")}
          >
            Нэвтрэх
          </Button>
        </ul>
      </div>
    </nav>
  );
}

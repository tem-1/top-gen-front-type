import Image from "next/image";
import React, { useState, useContext } from "react";
import logo from "../../assets/Logo.png";
import Link from "next/link";
import Navlinks from "./Navlinks";
import { ShoppingCart } from "lucide-react";
import LoginButton from "../LoginButton";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Store } from "@/context/Store";
export default function Navbar() {
  const [toggle, setToggle] = useState<Boolean>(false);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <nav className="bg-white">
      <div className="flex items-center  justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className=" md:cursor-pointer"
          />

          <div
            className="text-3xl md:hidden block"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <IoMdClose /> : <MdMenu />}
          </div>
        </div>
        <ul className="md:flex hidden  items-center gap-8 ">
          <li>
            <Link href="/" className="py-7 px-3 inline-block">
              Нүүр
            </Link>
          </li>
          <Navlinks />
        </ul>
        <div className="mr-4">
          <div className="relative w-10 h-10 flex items-center justify-center ">
            <Link href={"/cart"}>
              <ShoppingCart />
            </Link>
            <div className="w-4 h-4 font-semibold rounded-full bg-green-500 absolute top-1 right-0 text-xs flex items-center justify-center text-white">
              {cart.cartItems.length}
            </div>
          </div>
        </div>
        <div className="md:block hidden">
          <LoginButton />
        </div>
        {/* mobile menu */}
        <ul
          className={`md:hidden bg-white absolute w-full h-full  bottom-0 py-24 pl-4 duration-500 ${
            toggle ? "left-0" : "-left-[100%]"
          }`}
        >
          <li>
            <Link href="/" className="py-7 px-3  inline-block">
              Home
            </Link>
          </li>
          <Navlinks />
          <LoginButton />
        </ul>
      </div>
    </nav>
  );
}

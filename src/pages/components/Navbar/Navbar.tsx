import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import Link from "next/link";
import Navlinks from "./Navlinks";
import LoginButton from "../LoginButton";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
export default function Navbar() {
  const [toggle, setToggle] = useState<Boolean>(false);
  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
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

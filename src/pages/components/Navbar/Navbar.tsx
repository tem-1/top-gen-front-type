import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../assets/topgenLogo.png";
import Link from "next/link";
import Navlinks from "./Navlinks";
import LoginButton from "../LoginButton";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Cart from "./Cart";
import BestDiv from "../Layout/BestDiv";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import profileIcon from "../../assets/profile.png";
import notePad from "../../assets/note.png";
import { useCourseContext } from "@/states/state";
import { imgUrl } from "@/hooks/img";
import { useShoppingCart } from "@/context/ShoppingCartContext";
export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const [token, setToken] = useState<string | null>(null);
  const { cartItems } = useShoppingCart();
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);
  const { additional } = useCourseContext();
  return (
    <nav className="bg-white  flex justify-center">
      <div className=" mr-12 mt-3">
        <Link className="flex" href={"/"}>
          <Image
            src={`${imgUrl}/${additional?.logo}`}
            width={50}
            height={38}
            alt="logo"
            className="md:cursor-pointer hidden sm:hidden md:block lg:block mr-4"
          />
          <div className=" text-sm  font-semibold flex  h-full items-center hidden  md:block lg:block xl:block">
            TOP Genius <br /> Боловсролын төв
          </div>
        </Link>
      </div>
      <div className=" max-w-full">
        <div className=" w-full flex items-center ">
          <div className="w-full flex justify-between pl-12 z-50 p-5 md:w-auto">
            <div
              className="text-3xl md:hidden block"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <IoMdClose /> : <MdMenu />}
            </div>
          </div>
          <ul className="md:flex hidden items-center gap-8">
            <li>
              <Link href="/" className="py-7 px-3 inline-block text-sm  font-bold">
                Нүүр
              </Link>
            </li>
            <Navlinks />
          </ul>
          <Link href={"/cart"} className=" font-bold text-sm">
            <p className="ml-8 -mr-[5px]   hidden md:block lg:block ">Миний сагс</p>
          </Link>
          <Cart />

          <div className="md:block hidden">
            {token ? (
              <div className="flex border p-2 border-gray-300 rounded-md">
                <Link className="flex mx-2 text-sm" href={"/profile"}>
                  <Image className="mr-2 " src={profileIcon} alt="asdasdasd" />
                  Профайл/
                </Link>
                <Link className="flex mx-1 text-sm" href={"/myCourses"}>
                  <Image
                    src={notePad}
                    alt="notepad"
                    className="mr-2"
                    width={20}
                    height={5}
                  />{" "}
                  Худалдаж авсан сургалт{" "}
                </Link>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <button
                    type="button"
                    className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init=""
                  >
                    Нэвтрэх
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* mobile menu */}
          <ul
            className={`z-20 md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${toggle ? "left-0" : "-left-[100%]"
              }`}
          >
            <li>
              <Link href="/" className="py-7 px-3  inline-block">
                Нүүр
              </Link>
            </li>
            <Navlinks />
            {token ? (
              <div className="flex md:flex-row flex-col text-sm gap-6 mt-2">
                <Link className="flex  mx-2" href={"/profile"}>
                  <Image className="mr-2" src={profileIcon} alt="asdasdasd" />
                  Профайл
                </Link>
                <Link className="flex mx-2" href={"/myCourses"}>
                  <Image
                    src={notePad}
                    alt="notepad"
                    className="mr-2"
                    width={20}
                    height={10}
                  />
                  Худалдаж авсан сургалт
                </Link>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <button
                    type="button"
                    className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init=""
                  >
                    Нэвтрэх
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

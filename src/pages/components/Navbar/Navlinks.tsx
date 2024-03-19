import Link from "next/link";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import LoginButton from "../LoginButton";

const Navlinks = () => {
  const [heading, setHeading] = useState("");
  const links = [
    {
      name: "Сургалт",
      link: "/lesson",
    },
    {
      name: "Бидний тухай",
      link: "/about",
    },
    {
      name: "Үнэгүй хичээл",
    },
    {
      name: "Сэтгэгдлүүд",
    },
    // {
    //   name: "Мэдээ",
    //   link: "/news",
    // },
  ];

  return (
    <>
      {links.map((link, i) => (
        <div key={i}>
          <div className="px-3 text-left md:cursor-pointer group">
            <Link href={`${link.link}`}>
              <h1
                className="py-4 flex justify-between text-sm"
                onClick={() =>
                  heading !== link.name ? setHeading(link.name) : setHeading("")
                }
              >
                {link.name}
              </h1>
            </Link>
          </div>
          {/* mobile nav */}
          <div
            className={`${
              heading === link.name ? " md:hidden lg:hidden" : "hidden"
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};

export default Navlinks;

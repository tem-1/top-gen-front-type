import Link from "next/link";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import LoginButton from "../LoginButton";

const Navlinks = () => {
  const [heading, setHeading] = useState("");
  const links = [
    {
      name: "Сургалт",
      sublinks: [
        {
          name: "Танхим сургалт",
          link: "/",
        },
        {
          name: "Цахим сургалт",
          link: "/",
        },
      ],
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
    {
      name: "Мэдээ",
      link: "/news",
    },
  ];

  return (
    <>
      {links.map((link, i) => (
        <div key={i}>
          <div className="px-3 text-left md:cursor-pointer group">
            <Link href={`${link.link}`}>
              <h1
                className="py-7 flex justify-between"
                onClick={() =>
                  heading !== link.name ? setHeading(link.name) : setHeading("")
                }
              >
                {link.name}
                <span className="mt-1 ml-2 text-xl ">
                  {link.sublinks ? <RiArrowDropDownLine className="" /> : null}
                </span>
              </h1>
            </Link>
            {link.sublinks && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                  <div className="bg-white p-3.5">
                    {link.sublinks.map((sublink, j) => (
                      <div key={j} className=" p-[1px] ">
                        <Link
                          className="text-sm text-gray-600   my-2.5 hover:text-blue-500 p-4"
                          href={sublink.link}
                        >
                          <span className="">{sublink.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* mobile nav */}
          <div
            className={`${
              heading === link.name ? " md:hidden lg:hidden" : "hidden"
            }`}
          >
            {link.sublinks?.map((slink, k) => (
              <div key={k}>
                <div className="">
                  <Link
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5"
                    href={slink.link}
                  >
                    {slink.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Navlinks;

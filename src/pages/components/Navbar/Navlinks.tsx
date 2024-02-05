import Link from "next/link";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

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
    },
    {
      name: "Үнэгүй хичээл",
    },
    {
      name: "Сэтгэгдлүүд",
    },
    {
      name: "Мэдээ",
    },
  ];

  return (
    <>
      {links.map((link, i) => (
        <div key={i}>
          <div className="px-3 text-left md:cursor-pointer group">
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
            {link.sublinks && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                  <div className="bg-white p-3.5">
                    {link.sublinks.map((sublink, j) => (
                      <div key={j}>
                        <Link
                          className="text-sm text-gray-600 my-2.5 hover:text-blue-500"
                          href={sublink.link}
                        >
                          {sublink.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* mobile nav */}
          <div className={`${heading === link.name ? "md:hidden" : "hidden"}`}>
            {link.sublinks?.map((slink, k) => (
              <div key={k}>
                <div>
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

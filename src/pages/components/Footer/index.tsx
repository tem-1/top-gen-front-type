import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import bg from "../../assets/footerBg.png";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";

function Footer() {
  return (
    <div className=" ">
      <div className="w-full mainColor border-gray-300 border-t">
        <div className="container mx-auto py-12">
          <div className="xl:flex lg:flex md:flex pt-6">
            <div className="">
              <div className="flex items-center mb-6 xl:mb-0 lg:mb-0 pt-16">
                <Image width={300} height={300} src={bg} alt="footer  photo" />
              </div>
            </div>
            <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end sm:pl-0 ">
              <ul className="mr-0 sm:mr-0 md:mr-0 lg:mr-12">
                <li className="text-gray-200  text-md mb-6">Ангилал</li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5 ">
                  <Link href="/about">Бидний тухай</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-md text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/courses">Хичээл </Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/lessons">Сургалт</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/news">Мэдээ</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
              </ul>
            </div>
            <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
              <ul className="mr-0 sm:mr-0 md:mr-0 lg:mr-12">
                <li className="text-gray-100  text-md mb-6">Салбар 1:</li>
                <li className="text-sm text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/locations/1">
                    БГД, Гранд плаза, B хаалга, 9 давхарт 905
                  </Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/locations/2">Салбар 2:</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-sm text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="/locations/3">
                    ХУД, Гэгээнтэн оффис 9 давхарт 902
                  </Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
              </ul>
            </div>
            <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
              <ul>
                <li className="text-gray-200  text-md mb-6">Утас:</li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="tel:+994048078">Салбар 1: 94048078</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
                <li className="text-base text-gray-200 hover:text-gray-700 mb-5">
                  <Link href="tel:+995058078">Салбар 2: 95058078</Link>{" "}
                  {/* Replace <a> with <Link> */}
                </li>
              </ul>
            </div>
            <div className="w-11/12 xl:w-1/6 lg:w-2/5 mx-auto lg:mx-0 xl:mx-0 pt-3 xl:flex xl:justify-end pl-3 sm:pl-0">
              <ul>
                <li className="text-gray-200  text-md mb-6">Social</li>
                <li>
                  <div className=" ">
                    <div className="flex justify-start sm:justify-start xl:justify-end space-x-6 pr-2 xl:pr-0 lg:pr-0 md:pr-0 sm:pr-0">
                      <div className="flex gap-4">
                        <CiFacebook className="w-8 h-8 text-gray-300" />
                        <CiInstagram className="w-8 h-8 text-gray-300" />
                        <CiTwitter className="w-8 h-8 text-gray-300" />
                        <CiYoutube className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12"></div>
          <hr />
          <div className="mt-4 w-full flex justify-center">
            <p className="text-gray-300 text-base">2024 Tanusoft llc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

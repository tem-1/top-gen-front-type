import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import detailBg from "../assets/detailBg.png";
import Image from "next/image";
import { useCourseContext } from "@/states/state";
import { imgUrl } from "@/hooks/img";

const About = () => {
  const { about, getAbout } = useCourseContext();
  console.log(about);
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <Layout>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mt-[100px]">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col ">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              Бидний тухай
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              {about?.description}
            </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <Image
              className="w-full h-full mt-[80px]"
              src={`${imgUrl}/${about?.photo}`}
              alt="A group of People"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default About;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import bgCover from "./assets/Section.png";
import SearchBar from "./components/Searchbar/SearchBar";
import CourseList from "./components/cards/CourseCard";
import BestDiv from "./components/Layout/BestDiv";
import NewsList from "./components/cards/NewsCard";
import { Button } from "@/components/ui/button";
import CommentCard from "./components/cards/CommentCardt";
import Loader from "./components/Loader";
import { useCourseContext } from "@/states/state";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { course } = useCourseContext();
  console.log("course", course);
  const [loading, setLoading] = useState(true);

  const delay = setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <Navbar />
          <Image
            className=" h-[150px] sm:h-[250px] md:h-[300px] lg:h-[400px] "
            src={bgCover}
            width={1920}
            height={600}
            alt="bg"
          />
          <BestDiv>
            <div className="mt-12 z-10">
              <SearchBar />
              <h1 className="my-12">Бүх сургалт</h1>
              <CourseList courses={course} />
            </div>
            <div className="flex flex-col items-center mt-20 ">
              <div className="rounded-xl bg-[#72C06C] text-white px-6 py-1 ">
                Мэдээ, блог
              </div>
              <span className="text-[44px] text-[#38B6FF] font-semibold mb-8">
                Шинэ мэдээ
              </span>
              <div className="mb-12">
                <NewsList />
              </div>
            </div>
            <div className=" h-auto relative bg-gradient-to-b mainColor to-[#ffffff] flex flex-col items-center justify-center">
              <div className="flex flex-col w-[70%] items-center max-w-[1400px]">
                <span className="text-white text-[30px] sm:text-[35px] md:text-[40px]   my-12 ">
                  Сэтгэгдлүүд
                </span>
                <div className="">
                  <CommentCard />
                </div>
                <div className="w-auto rounded-xl my-12 bg-white shadow-xl flex px-2 py-2 gap-2">
                  <textarea
                    rows={1}
                    className=" border rounded-xl flex-1 p-4"
                    placeholder="Сэтгэгдэл бичих..."
                  ></textarea>
                  <Button className="primary-button px-6 mt-2 flex ">
                    Илгээх
                  </Button>
                </div>
              </div>
            </div>
          </BestDiv>
        </div>
      )}
    </>
  );
}

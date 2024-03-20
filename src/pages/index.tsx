import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/Searchbar/SearchBar";
import CourseList from "./components/cards/CourseCard";
import BestDiv from "./components/Layout/BestDiv";
import Loader from "./components/Loader";
import { useCourseContext } from "@/states/state";
import Footer from "./components/Footer";
import BgCover from "./components/Cover";
import Messenger from "./components/Messenger/Messenger";
import NewsCard from "./components/News/NewsCard";
import NewsSection from "./components/News/NewsSection";

export default function Home() {
  const { course } = useCourseContext();
  // console.log("course", course);
  const [filteredData, setFilteredData] = useState(course);
  useEffect(() => {
    setFilteredData(course);
  }, [course]);

  //search code
  const [searchParams, setSearchParams] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchParams(searchTerm);
    if (!searchTerm) {
      setFilteredData(course);
    } else {
      const filter = course.filter((list: any) =>
        list?.coursname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filter);
    }
  };
  // end duusna
  const [loading, setLoading] = useState(true);
  const delay = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full  ">
          <Navbar />
          {/* cover  */}
          <BgCover />
          <Messenger />
          <BestDiv>
            <div className="my-12 z-10 w-full">
              <SearchBar onSearch={onSearch} />
              <h1 className="my-12 p-6 text-3xl text-sky-400">Бүх сургалт</h1>
              <CourseList courses={filteredData} />
            </div>

            {/* <div className=" bg-gradient-to-r from-[#FADD02] to-[#B60C3B] h-40 my-20 flex items-center justify-between text-white font-semibold px-10">
              <span>Туршлагатай багш нар</span>
              <span>|</span>
              <span>Цогц хөтөлбөр</span>
              <span>|</span>
              <span>ЭЕШ тест</span>
              <span>|</span>
              <span>Батлагдсан үр дүн</span>
            </div> */}

            <img
              src="/cover.jpg"
              alt=""
              className="w-full md:h-[300px] h-[200px] object-cover mb-8 bg-transparent"
            />

            <NewsSection />

            <div className=" my-[100px]"></div>
          </BestDiv>
          <Footer />
        </div>
      )}
    </>
  );
}

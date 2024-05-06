import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import axiosInstance from "@/hooks/axios";
import { useCourseContext } from "@/states/state";
import Link from "next/link";

const NewsSection = () => {
  const { news, getNews } = useCourseContext();
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="flex flex-col w-full px-10 items-center">
      <span className="mb-8 text-3xl font-bold  text-[#38B6FF]">
        Шинэ мэдээ{" "}
      </span>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        {news
          ? news.map((list: any, index: any) => {
            return (
              <Link href={`/news/${list?._id}`} key={index}>
                <NewsCard key={index} news={list} />
              </Link>
            );
          })
          : null}
      </div>
    </div>
  );
};

export default NewsSection;

import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import axiosInstance from "@/hooks/axios";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("https://topgeniuses.tanuweb.cloud/api/v1/news")
      .then((res) => setNews(res.data.data));
  });
  return (
    <div className="flex flex-col w-full px-10 items-center">
      <span className="mb-8 text-2xl font-semibold text-[#38B6FF]">
        Шинэ мэдээ{" "}
      </span>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        {news
          ? news.map((list, index) => {
              return <NewsCard key={index} news={list} />;
            })
          : null}
      </div>
    </div>
  );
};

export default NewsSection;

import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { useCourseContext } from "@/states/state";
import NewsCard from "../components/News/NewsCard";
const SingleNews = () => {
  const { singleNews, getSingleNews, news } = useCourseContext();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleNews(id);
  }, [id]);
  return (
    <Layout>
      <div className="w-full container flex flex-col items-center px-4 md:px-48 bg-white">
        <span className="uppercase my-4 font-semibold">{singleNews?.name}</span>
        <img
          src={`https://https://topgenius.tanusoft.mn/uploads/${singleNews?.photo}`}
          alt=""
          className="w-full md:h-[500px] h-[200px] object-cover pt-10 rounded-lg"
        />
        <div className="w-full my-8">
          <div dangerouslySetInnerHTML={{ __html: singleNews?.description }} />
        </div>
        <hr className="bg-black w-full" />
        <div className="w-full flex flex-col items-center">
          <h1 className="my-4 p-6 text-2xl text-sky-400">Бүх сургалт</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 ">
            {news?.slice(0, 3)?.map((list: any, index: any) => {
              return <NewsCard news={list} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleNews;

import { Calendar, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NewsProp {
  _id: string;
  name: string;
  special: string;
  description: string;
  photo?: string;
  category: any;
  file?: string;
  createdAt: string;
}
interface NewsCardProp {
  news: NewsProp;
}
const NewsCard = ({ news }: NewsCardProp) => {
  return (
    <div className="w-full h-[400px] border rounded-tr-2xl flex flex-col shadow-2xl group  overflow-hidden">
      <img
        src={`https://topgeniuses.tanuweb.cloud/uploads/${news?.photo}`}
        alt=""
        className="w-full h-[50%] object-cover p-2 rounded-bl-2xl rounded-tr-2xl border-b-2 group-hover:scale-110 transition duration-500 cursor-pointer 
        "
      />
      <div className="flex flex-col w-full px-10 py-4 gap-2">
        <span className="flex items-center gap-2 text-[#FD3F00]">
          <Tag size={20} />
          <span className="text-sm  text-gray-600 ">
            {news?.category?.categoryName}
          </span>
        </span>
        <span className="font-semibold line-clamp-3 h-[70px]">
          {news?.name}
        </span>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-2 ">
            <Calendar size={20} className="text-[#FD3F00]" />
            <span className="text-sm">{news?.createdAt?.split("T")[0]}</span>
          </div>
          <Link href={`/news/${news?._id}`}>
            <span className="text-sm uppercase text-[#FD3F00] cursor-pointer hover:underline">
              Цааш унших
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

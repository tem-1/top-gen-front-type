import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User, Tag, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Author {
  name: string;
  icon: string;
  iconSize: number;
}

interface Tags {
  text: string;
  icon: string;
  iconSize: number;
}

interface DateInfo {
  icon: string;
  iconSize: number;
  text: string;
}

interface News {
  id: number;
  imageSrc: string;
  author: Author;
  tags: Tags;
  title: string;
  date: DateInfo;
  readMoreLink: string;
}

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="w-full h-auto flex flex-col bg-white rounded-lg shadow-xl">
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={news.imageSrc}
            alt="Image"
            layout="fill"
            className="rounded-tr-2xl rounded-bl-2xl object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col px-6 py-4">
        <div className="flex items-center justify-between pr-10 text-[#38B6FF]">
          <div className="flex items-center gap-2">
            <User size={news.author.iconSize} />
            <span className="text-[10px]">Зохиогч: {news.author.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag size={news.tags.iconSize} />
            <span className="text-[10px]">{news.tags.text}</span>
          </div>
        </div>
        <span className="uppercase my-4 font-bold line-clamp-3 h-[90px] ">
          {news.title}
        </span>

        <hr className="my-2" />
        <div className="flex h-10 justify-between items-center text-[#38B6FF]">
          <div className="flex items-center gap-2">
            <CalendarDays size={news.date.iconSize} />
            <span className="text-[14px]">{news.date.text}</span>
          </div>

          <span className="uppercase text-[14px] underline px-4">
            {news.readMoreLink}
          </span>
        </div>
      </div>
    </div>
  );
};

const NewsList: React.FC = () => {
  const newsData: News[] = [
    {
      id: 1,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 11,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 12,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 13,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 14,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 15,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },
    {
      id: 21,
      imageSrc:
        "https://static-cse.canva.com/blob/1145215/1.magebyRodionKutsaevviaUnsplash.jpg",
      author: { name: "Админ", icon: "User", iconSize: 20 },
      tags: { text: "Дэлхий", icon: "Tag", iconSize: 17 },
      title: "Өнөөдөр дэлхийн шинжлэх ухааны өдөр билээ... ы өдөр билээ...",
      date: { icon: "CalendarDays", iconSize: 20, text: "2024.01.29" },
      readMoreLink: "Цааш унших",
    },

    // Add more news objects as needed
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {newsData.slice(0, 4).map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
};

export default NewsList;

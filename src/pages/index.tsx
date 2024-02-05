import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import bgCover from "./assets/Hero.png";
import SearchBar from "./components/Searchbar/SearchBar";
import Layout from "./components/Layout/Layout";
import CourseList from "./components/CourseCard/CourseCard";
import BestDiv from "./components/Layout/BestDiv";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <Image
        className="h-[400px]"
        src={bgCover}
        width={1920}
        height={600}
        alt="bg"
      />
      <BestDiv>
        <div className="mt-12">
          <SearchBar />
          <h1 className="my-12">Бүх сургалт</h1>
          <CourseList />
        </div>
      </BestDiv>
    </div>
  );
}

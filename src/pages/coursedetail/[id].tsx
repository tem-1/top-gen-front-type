import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { useCourseContext } from "@/states/state";
import { useRouter } from "next/router";
import "next-cloudinary/dist/cld-video-player.css";
import { imgUrl } from "@/hooks/img";
import CommentButton from "../components/cards/CommentButton";
import BgCover from "../components/Cover";
interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, getSingleCourse, singleCourse } = useCourseContext();
  const [lessName, setLessonName] = useState("");
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id && typeof id === "string" && id.trim() !== "") {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);

  return (
    <Layout>
      <BgCover />
      <div className="container border  mt-12 h-auto flex  flex-col md:flex-row  bg-white p-4 rounded-md">
        <Image
          src={`${imgUrl}/${singleCourse.photo}`}
          className=" p-8"
          width={800}
          height={800}
          alt="courseDetail photo"
        />
        <div className="max-w-[1000px]">
          <div className=" mt-8 ">
            <h1 className="">Сургалтын тайлбар:</h1>
            <p className=" text-gray-400 text-sm m-4">
              {singleCourse.description}
            </p>
            <p>Сэтгэгдэл бичих :</p>
            <CommentButton />
          </div>
        </div>
      </div>
      <div className=" h-[200px] "></div>
    </Layout>
  );
};

export default Detail;

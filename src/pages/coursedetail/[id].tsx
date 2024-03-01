import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import bgCover from "@/pages/assets/Section.png";
import { useCourseContext } from "@/states/state";
import { useRouter } from "next/router";
import "next-cloudinary/dist/cld-video-player.css";
import { CldVideoPlayer } from "next-cloudinary";
import { FcVideoCall } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import { imgUrl } from "@/hooks/img";
import BestDiv from "../components/Layout/BestDiv";
import CommentButton from "../components/cards/CommentButton";
interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, getSingleCourse, singleCourse } = useCourseContext();
  const [lessName, setLessonName] = useState("");
  const router = useRouter();
  console.log(" router  hewlew", router);
  const { id } = router.query;
  useEffect(() => {
    if (id && typeof id === "string" && id.trim() !== "") {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);

  return (
    <Layout>
      <Image
        className="w-full flex justify-center h-[150px] sm:h-[250px] md:h-[300px] lg:h-[400px]"
        src={bgCover}
        width={1920}
        height={600}
        alt="bg"
      />
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

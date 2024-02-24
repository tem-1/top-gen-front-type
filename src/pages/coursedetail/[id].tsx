import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import bgCover from "@/pages/assets/Section.png";
import { useCourseContext } from "@/states/state";
import { useRouter } from "next/router";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { imgUrl } from "@/hooks/img";

interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, lesson, getSingleCourse } = useCourseContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);

  const [videoSrc, setVideoSrc] = useState<string>("");

  const handleChangeVideo = (video: string) => {
    setVideoSrc(video);
    console.log(video);
  };

  return (
    <Layout>
      <Image
        className="h-[400px]"
        src={bgCover}
        width={1920}
        height={600}
        alt="bg"
      />
      <div className="container border h-auto my-12 flex gap-10">
        <CldVideoPlayer
          id={`video-player-${videoSrc}`}
          width="800"
          height="800"
          src={`${imgUrl}/${videoSrc}`}
        />
        <div className="border p-4 rounded-lg ">
          <h1 className="flex w-full justify-start items-center pt-2 text-xl">
            Сургалтын хөтөлбөр
          </h1>
          <div className="borderColor p-4 rounded-xl my-4 fontMain ">
            {lesson?.map((index: any, i: any) => (
              <div className="flex items-center h-full" key={index._id}>
                <div className="mx-2"> №:{i + 1} </div>
                <div
                  onClick={() => handleChangeVideo(index.video)}
                  className="border pl-2 p-2 w-full my-1 border-red-900 rounded-xl cursor-pointer"
                >
                  {index.title}
                </div>
                <div className="ml-12 flex justify-end"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

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
interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, getSingleCourse, singleCourse } = useCourseContext();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id && typeof id === "string" && id.trim() !== "") {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);

  const handleChangeVideo = (video: string) => {
    localStorage.setItem("video", video);
    console.log("------------------------------------", video);
    window.location.reload();
  };

  const [lessonDurations, setLessonDurations] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (singleCourse && singleCourse.lessons) {
      const fetchDurations = async () => {
        const durations: { [key: string]: number } = {};
        for (const lesson of singleCourse.lessons) {
          try {
            const response = await fetch(
              `API_ENDPOINT_TO_GET_DURATION/${lesson.video}`
            );
            if (response.ok) {
              const durationData = await response.json();
              durations[lesson.video] = durationData.duration; // Store duration in seconds
            }
          } catch (error) {
            console.error("Error fetching duration for lesson:", error);
          }
        }
        setLessonDurations(durations);
      };
      fetchDurations();
    }
  }, [singleCourse]);

  let localStorageVideo = "";
  if (typeof window !== "undefined") {
    localStorageVideo = localStorage.getItem("video") || "";
  }

  return (
    <Layout>
      <Image
        className="h-[150px] sm:h-[250px] md:h-[300px] lg:h-[400px]"
        src={bgCover}
        width={1920}
        height={600}
        alt="bg"
      />
      <div className="container border  mt-12 h-auto  flex  flex-col md:flex-row lg-flex-row">
        {localStorageVideo && (
          <CldVideoPlayer
            id={`${Math.random().toString(36).substring(7)}`}
            width="800"
            height="800"
            controls={true}
            src={`${imgUrl}/${localStorageVideo}`}
          />
        )}

        <div className="border p-4 rounded-lg  ml-0 md:ml-12  ">
          <h1 className="flex w-full justify-start items-center pt-2 text-xl">
            Хичээлүүд
          </h1>
          <div className="lesson-list p-4 rounded-xl my-4 ">
            {singleCourse?.lessons?.map((item: any, index: number) => (
              <div className=" items-center" key={index}>
                <div className=" lesson-item pl-2 p-4 w-full my-1  rounded-md cursor-pointer border border-blue-400 bg-blue-400">
                  <span className=" text-white">
                    {index + 1} {item.title}
                  </span>
                </div>
                <div className="flex ">
                  <div
                    onClick={() => handleChangeVideo(item.video)}
                    className="my-1 cursor-pointer   hover:underline rounded-sm p-1 w-full h-full mr-1 flex items-start justify-center text-blue-400 border border-blue-400"
                  >
                    <span className="mr-2">
                      <FcVideoCall className="mt-1" />
                    </span>{" "}
                    Үзэх
                  </div>
                  <div className="my-1 rounded-sm p-1 w-full h-full hover:underline  mr-1 flex items-start justify-center text-blue-400 border border-blue-400">
                    <span className="mr-2">
                      <FcQuestions className="mt-1" />
                    </span>
                    Тест
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

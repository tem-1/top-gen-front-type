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
import axiosInstance from "@/hooks/axios";
import BgCover from "../components/Cover";

interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, getSingleCourse, singleCourse, lastViewVideo, myLesson } =
    useCourseContext();
  const [lessonName, setLessonName] = useState<string>("");
  const [videoSrc, setVideoSrc] = useState<string>();
  const router = useRouter();
  const { id } = router.query;
  const courseDetailId: any = id;
  const filter = myLesson.filter(
    (x: any) => x?.courseId?._id.toLowerCase() === courseDetailId?.toLowerCase()
  );
  useEffect(() => {
    if (id && typeof id === "string" && id.trim() !== "") {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);

  const handleChangeVideo = async (video: string, index: number) => {
    try {
      const res = await axiosInstance.post("/suuldUzsenVideo", {
        lessonVideo: video,
        courseId: courseDetailId,
      });
      console.log("Video saved:", res.data.data._id);
      videAxios(res.data.data._id);
      setClickedButtonIndex(index); // Set the index of the clicked button
    } catch (err: any) {
      console.log("Error saving video:", err.message);
    }
  };

  const videAxios = async (lastVideoId: string) => {
    try {
      const res = await axiosInstance.post(`/suuldUzsenVideo/${lastVideoId}`, {
        courseId: courseDetailId,
      });
      console.log("****************************", res.data?.data);
      setVideoSrc(res.data?.data?.[0].lessonVideo || "");
    } catch (err: any) {
      console.log("Error fetching video:", err.message);
    }
  };
  const [bgColor, setBgColor] = useState("");
  const handleLastVideoSrc = async () => {};
  const handleChangeColor = (bgColor: any) => {};
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
      };
      fetchDurations();
    }
  }, [singleCourse]);

  const handleChangeName = (name: string) => {
    setLessonName(name);
  };

  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(
    null
  );

  const VideoPlayer = () => {
    let filterVideo = singleCourse?.lessons?.filter(
      (x: any) => x?.video?.toLowerCase() === videoSrc?.toLowerCase()
    );
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }, [videoSrc]);

    return (
      <div>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : videoSrc ? (
          <CldVideoPlayer
            id={`${Math.random().toString(36).substring(7)}`}
            width="800"
            height="200"
            controls={true}
            src={`${imgUrl}/${videoSrc}`}
          />
        ) : (
          <div className="text-red-500">
            <CldVideoPlayer
              id={`${Math.random().toString(36).substring(7)}`}
              width="800"
              height="200"
              controls={true}
              src={`${imgUrl}/${singleCourse.lessons?.[0]?.video}`}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <BgCover />
      <div className=" container mt-12 text-red-500 text-xl">
        <p>Сургалт дуусах хугацаа: {filter?.[0]?.duusahHugatsaa}</p>
      </div>

      <div className="container border mt-12 h-auto flex flex-col md:flex-row bg-white  p-4 rounded-md">
        <div className="max-w-[1000px]">
          <VideoPlayer />
          <div className="hidden sm:hidden md:block lg:block mt-8 ">
            <h1 className="">Сургалтын тайлбар:</h1>
            <p className="text-gray-400 text-sm m-4 text-justify">
              {singleCourse.description}
            </p>
            <p>Сэтгэгдэл бичих :</p>
            <CommentButton />
          </div>
        </div>
        <div className="flex flex-col mt-0 sm:mt-1 md:mt-4 lg:mt-12">
          <div className="border p-4 rounded-lg ml-0 md:ml-12 h-[600px] overflow-y-auto">
            <div className="mb-2 flex items-center justify-center">
              <FcVideoCall />
              <span>Хичээлүүд</span>
            </div>
            <div className="lesson-list rounded-xl my-4">
              {singleCourse?.lessons?.map((item: any, index: number) => (
                <div className="items-center" key={index}>
                  <div
                    className={`lesson-item pl-2 p-4 w-full my-1 rounded-md cursor-pointer border border-blue-400 ${
                      clickedButtonIndex === index
                        ? "bg-slate-600"
                        : " bg-blue-500 "
                    }`}
                  >
                    <span className="text-white">
                      {index + 1} {item.title}
                    </span>
                  </div>
                  <div className="flex">
                    <div
                      onClick={() => {
                        handleChangeVideo(item.video, index);
                        handleChangeName(item.title);
                        handleChangeColor("bg-blue");
                      }}
                      className={`my-1 cursor-pointer hover:underline rounded-sm p-1 w-full h-full mr-1 flex items-start justify-center text-blue-400 border border-blue-400 ${
                        clickedButtonIndex === index ? "bg-blue-600" : ""
                      }`}
                    >
                      <span className="mr-2">
                        <FcVideoCall className="mt-1" />
                      </span>{" "}
                      Үзэх
                    </div>
                    <div className="my-1 rounded-sm p-1 w-full h-full hover:underline mr-1 flex items-start justify-center text-blue-400 border border-blue-400">
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
          {/* <div className="m-2">
            <h1>Төстэй сургалтууд</h1>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

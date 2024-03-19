import { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCourseContext } from "@/states/state";
import "next-cloudinary/dist/cld-video-player.css";
import { imgUrl } from "@/hooks/img";
import { useRouter } from "next/router";
import CommentButton from "../components/cards/CommentButton";
import BgCover from "../components/Cover";
import { ToastContainer, toast } from "react-toastify";
import ExampleComponent from "../components/CommentList ";
import axiosInstance from "@/hooks/axios";

interface DetailProps { }

const Detail: FunctionComponent<DetailProps> = () => {
  const { getLesson, getSingleCourse, singleCourse } = useCourseContext();
  const [showFull, setShowFull] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState<any>([]);
  useEffect(() => {
    axiosInstance.get(`/course/${id}/comment`).then((response) => {
      setComments(response.data.data);
    }).catch((error) => { console.log(error) })
  }, [id])
  console.log("***********", comments)

  useEffect(() => {
    if (id && typeof id === "string" && id.trim() !== "") {
      getSingleCourse(id);
      getLesson(id);
    }
  }, [id]);
  console.log(singleCourse);
  return (
    <Layout>
      <ToastContainer />
      <BgCover />
      <div className="container border  mt-12 h-auto flex  flex-col md:flex-row  bg-white p-4 rounded-md">
        <img
          src={`${imgUrl}/${singleCourse.photo}`}
          className=" p-8 lg:w-[50%] h-[400px] object-cover w-full"
        />
        <div className="max-w-[1000px]">
          <div className=" mt-8 ">
            <h1 className="">Сургалтын тайлбар:</h1>
            <p className=" text-gray-400 text-sm my-4 text-justify transition duration-300">
              {!showFull
                ? singleCourse?.description?.slice(0, 1000) + "..."
                : singleCourse?.description}
              {!showFull && (
                <span
                  className="text-sm text-blue-500 hover:underline cursor-pointer ml-4"
                  onClick={() => {
                    setShowFull(true);
                  }}
                >
                  Үргэлжлүүлэн тайлбар унших
                </span>
              )}
              {showFull && (
                <span
                  className="text-sm text-blue-500 hover:underline cursor-pointer ml-4"
                  onClick={() => {
                    setShowFull(false);
                  }}
                >
                  Хураах
                </span>
              )}
            </p>

            Сэтгэгдлүүд
            {
              comments.map((comment: any) => {
                return (
                  <ExampleComponent key={comment._id} comment={comments} />
                )
              })
            }
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

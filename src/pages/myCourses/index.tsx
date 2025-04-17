import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCourseContext } from "@/states/state";
import MyCourseList from "../components/cards/myCourseCard";
import { IoReloadSharp } from "react-icons/io5";
interface MyCoursesProps {}

const MyCourses: FunctionComponent<MyCoursesProps> = () => {
  const { myLesson, getMyLesson } = useCourseContext();
  const courses = myLesson.map((el: any) => el.courseId);

  const [loading, setLoading] = useState(false);

  const refresh = (event: any) => {
    event.preventDefault();
    getMyLesson();
  };

  return (
    <div>
      <Layout>
        <div className=" h-[120px] w-full  mainColor">
          <h1 className="font-semibold container text-white text-2xl flex h-full items-center">
            Миний сургалт
          </h1>
        </div>

        <div className=" container">
          <h1 className="text-3xl my-8 font-normal">Миний сургалтууд</h1>
          <p className="underline decoration-4 decoration-linear-gradient(94.05deg, #FAE202 0%, #FD3F00 47.5%, #AF0740 100%); underline-offset-8 my-12 text-xl">
            Сургалтууд
          </p>
          <button
            onClick={refresh}
            className="flex my-8 bg- bg-blue-500 rounded-md  px-4 py-2 ml-4 text-white text-sm"
          >
            Шинэчлэх
            <IoReloadSharp className="  m-1  w-3  " />
          </button>
          <MyCourseList courses={courses} />
        </div>
        <div className=" my-[200px]"> </div>
      </Layout>
    </div>
  );
};

export default MyCourses;

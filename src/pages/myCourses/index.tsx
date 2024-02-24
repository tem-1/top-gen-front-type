import { FunctionComponent, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import myCourseStore from "@/states/myLessonState";
import CourseList from "../components/cards/CourseCard";
interface MyCoursesProps {}
const MyCourses: FunctionComponent<MyCoursesProps> = () => {
  const { myCourses, myCourse } = myCourseStore();
  useEffect(() => {
    myCourse();
  }, [myCourses]);

  console.log("my course dotor bga", myCourses);
  const courses = myCourses.map((el: any) => el.courseId);
  console.log(" my courses");
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
            Сургалтууд{" "}
          </p>
          <CourseList courses={courses} />{" "}
        </div>
      </Layout>
    </div>
  );
};

export default MyCourses;

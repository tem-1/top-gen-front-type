import { FunctionComponent, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCourseStore from "@/states/state";
import myCourseStore from "@/states/myLessonState";
import CourseList from "../components/cards/CourseCard";

interface MyCoursesProps {}

const MyCourses: FunctionComponent<MyCoursesProps> = () => {
  const { myCourses, myCourse } = myCourseStore();

  useEffect(() => {
    myCourse(); // Fetch my courses when the component mounts
  }, []);

  console.log("my course dotor bga", myCourses);
  const courses = myCourses.map((el: any) => el.course);
  console.log(courses);
  return (
    <div>
      <Layout>
        <CourseList courses={courses} />{" "}
        {/* Pass courses instead of myCourse */}
      </Layout>
    </div>
  );
};

export default MyCourses;

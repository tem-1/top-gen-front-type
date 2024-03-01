import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imgUrl } from "@/hooks/img";
import { useCourseContext } from "@/states/state";

interface Course {
  _id: string;
  coursname: string;
  employee: {
    name: string;
  };
  photo: string;
  category: {
    _id: string;
  };
  price: number;
}

interface CourseCardProps {
  course: any;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const storedUser = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : null;
  const [filteredData, setFilteredData] = useState(course);

  const { myLesson } = useCourseContext();

  console.log(myLesson);

  // const test = myLesson.find((x: any) => {
  //   const i = x.courseId?._id === filteredData._id;
  //   console.log("i dugaar index:", i);
  //   return i; // return true or false based on condition
  // });

  // const baina = myLesson.map((el: any, i: number) => ({
  //   check: el.createUser === storedUser._id && el.courseId._id === course._id,
  // }));

  const isInMyLessons = myLesson.some((lesson: any) => {
    if (lesson?.courseId && lesson?.createUser) {
      return lesson.courseId._id.toLowerCase() === course._id.toLowerCase();
    }
    return false;
  });

  console.log(
    "idssssssssssssssssssssssssssssssssssssssssssssssssssss",
    isInMyLessons
  );

  // console.log("----------------------------", test);

  const notifySuccess = (message: any) =>
    toast.success("Сагсанд нэмэглээ " + message);

  const router = useRouter();

  console.log("router pathname", router.pathname);

  const { increaseCartQuantity } = useShoppingCart();

  const handleAdd = (course: any) => {
    increaseCartQuantity(course);

    notifySuccess(course.coursname);
  };
  return (
    <div className="h-auto p-4 flex flex-col bg-white rounded-lg">
      <div className="w-full">
        <Link href={`/coursedetail/${course._id}`}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`${imgUrl}/${course.photo}`}
              alt="Course Image"
              layout="fill"
              className="rounded-tl-2xl rounded-br-2xl object-cover cursor-pointer"
            />
          </AspectRatio>
        </Link>
      </div>
      <span className="uppercase">{course.coursname}</span>
      <span className="text-xs my-2"> Багш : {course?.employee?.name}</span>
      <hr className="my-4" />
      <div className="flex h-10 justify-between items-center">
        {router.pathname === "/myCourses" ? (
          <div className="">
            <button className="p-3 border border-blue-300  hover:transition-opacity  rounded-2xl ">
              Хичээл үзэх
            </button>
          </div>
        ) : isInMyLessons ? null : (
          <Button
            onClick={() => handleAdd(course)}
            className="bg-[#FD3F00] rounded-md"
          >
            {"сагслах"}
          </Button>
        )}
        {router.pathname === "/myCourses" ? (
          <div className=""></div>
        ) : (
          <div>
            {isInMyLessons ? (
              <div className="bg-green-300 p-2 rounded-md">
                {" "}
                Худалдаж авсан{" "}
              </div>
            ) : (
              <span> Үнэ : {course.price}₮</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface CourseListProps {
  courses: any;
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses?.map((course: any) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseList;

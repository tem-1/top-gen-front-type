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

  const isInMyLessons = myLesson.some((lesson: any) => {
    if (lesson?.courseId && lesson?.createUser) {
      return lesson.courseId._id.toLowerCase() === course._id.toLowerCase();
    }
    return false;
  });

  const notifySuccess = (message: any) =>
    toast.success("Сагсанд нэмэгдлээ : " + message);

  const router = useRouter();

  console.log("router pathname", router.pathname);

  const { increaseCartQuantity } = useShoppingCart();

  const handleAdd = (course: any) => {
    increaseCartQuantity(course);

    notifySuccess(course.coursname);
  };
  return (
    <div className="relative h-auto p-4 flex flex-col bg-white rounded-lg  w-auto">
      <div className="w-full">
        <Link href={`/coursedetail/${course._id}`}>
          <AspectRatio ratio={16 / 16}>
            <Image
              src={`${imgUrl}/${course.photo}`}
              alt="Course Image"
              layout="fill"
              className="rounded-tl-2xl rounded-br-2xl object-cover cursor-pointer"
            />
          </AspectRatio>
        </Link>
      </div>
      <span className="uppercase my-4 h-[50px] line-clamp-2 ">
        {course.coursname}
      </span>
      <span className="text-xs my-2"> Багш : {course?.employee?.name}</span>
      <hr className="my-4  " />
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
            className="bg-[#FD3F00] rounded-md absolute bottom-5 right-4 "
          >
            {"Сагслах"}
          </Button>
        )}
        {router.pathname === `/myCourses` ? (
          <div className=""></div>
        ) : (
          <div>
            {isInMyLessons ? (
              <Link className="flex" href={'/myCourses/' + course._id}>
                <div className="bg-sky-300 p-2 rounded-md">
                  Сургалт үзэх
                </div>
                <p className=" text-slate-400 underline text-xs flex h-full  justify-center p-2 ml-1">Та худалдаж авсан байна</p>
              </Link>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {courses?.map((course: any) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseList;

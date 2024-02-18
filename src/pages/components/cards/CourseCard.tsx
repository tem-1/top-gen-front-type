import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useRouter } from "next/router";
export const imgUrl = "http://localhost:9090/uploads";

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
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  console.log("router pathname", router.pathname);
  const { increaseCartQuantity } = useShoppingCart();
  const handleAdd = (course: any) => {
    increaseCartQuantity(course);
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
      <span className="text-xs my-2"> Багш : {course.employee.name}</span>
      <hr className="my-4" />
      <div className="flex h-10 justify-between items-center">
        {router.pathname === "/myCourses" ? (
          <button className="p-2  mainColor"> Дэлгэрэнгүй </button>
        ) : (
          <Button
            onClick={() => handleAdd(course)}
            className="bg-[#FD3F00] rounded-md"
          >
            {"сагслах"}
          </Button>
        )}

        <span>{course.price}</span>
      </div>
    </div>
  );
};

interface CourseListProps {
  courses: any;
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map((course: any) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

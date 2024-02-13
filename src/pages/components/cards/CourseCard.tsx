import React, { useEffect } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import useStore from "@/states/state";
import { Course } from "@/types/type"; // Assuming Course interface is defined in "type.ts" file

export const imgUrl = "http://localhost:9090/uploads";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const handleAdd = (course: Course) => {
    increaseCartQuantity(course);
  };

  return (
    <div className="h-auto p-4 flex flex-col bg-white rounded-lg">
      <div className="w-full">
        <Link href={`coursedetail/${course._id}`}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`${imgUrl}/${course.photo}`} // Use photo instead of imageSrc
              alt="Image"
              layout="fill"
              className="rounded-tl-2xl rounded-br-2xl object-cover"
            />
          </AspectRatio>
        </Link>
      </div>
      <span className="uppercase">{course.coursename}</span>{" "}
      {/* Use coursename instead of courseTitle */}
      <span className="text-xs my-2">{course.category}</span>{" "}
      {/* Use category instead of courseDescription */}
      <div className="flex items-center justify-between pr-10 text-[#6C757D]">
        <div className="flex items-center gap-2">
          <Video size={4} />
          <span className="text-sm text-[#6C757D]">{"text"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={2} />
          <span className="text-sm text-[#6C757D]">{"text"}</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex h-10 justify-between items-center">
        <Button
          className="bg-[#FD3F00] rounded-md"
          onClick={() => handleAdd(course)}
        >
          {"add text"}
        </Button>

        <span>{course.price}</span>
      </div>
    </div>
  );
};

const CourseList: React.FC = () => {
  const { courseData, fetchCourseData } = useStore();
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courseData.map((course: Course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

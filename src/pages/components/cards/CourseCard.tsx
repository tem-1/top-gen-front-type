import React, { useContext } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Video, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courseData } from "../../utils/data";
import Link from "next/link";
import { Store } from "@/context/Store";

interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  videoInfo: {
    icon: string;
    size: number;
    text: string;
  };
  clockInfo: {
    icon: string;
    size: number;
    text: string;
  };
  buttonText: string;
  price: string;
  imageSrc: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { state, dispatch } = useContext(Store);

  const handleAdd = (course: Course) => {
    const existItem = state.cart.cartItems.find(
      (x: Course) => x._id === course._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...course, quantity },
    });
  };

  return (
    <div className="h-auto p-4 flex flex-col bg-white rounded-lg">
      <div className="w-full">
        <Link href={`coursedetail/${course._id}`}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={course.imageSrc}
              alt="Image"
              layout="fill"
              className="rounded-tl-2xl rounded-br-2xl object-cover"
            />
          </AspectRatio>
        </Link>
      </div>
      <span className="uppercase">{course.courseTitle}</span>
      <span className="text-xs my-2">{course.courseDescription}</span>
      <div className="flex items-center justify-between pr-10 text-[#6C757D]">
        <div className="flex items-center gap-2">
          <Video size={course.videoInfo.size} />
          <span className="text-sm text-[#6C757D]">
            {course.videoInfo.text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={course.clockInfo.size} />
          <span className="text-sm text-[#6C757D]">
            {course.clockInfo.text}
          </span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex h-10 justify-between items-center">
        <Button
          className="bg-[#FD3F00] rounded-md"
          onClick={() => handleAdd(course)}
        >
          {course.buttonText}
        </Button>
        <span>{course.price}</span>
      </div>
    </div>
  );
};

const CourseList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courseData.map((course: any) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

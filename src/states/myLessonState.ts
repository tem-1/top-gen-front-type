import { create } from "zustand";
import { handleApiError } from "@/error/error";
import { persist } from "zustand/middleware";
import axiosInstance from "@/hooks/axios";

interface EmployeeType {
  _id: string;
  firstname: string;
  registerNumber: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  photo: string;
  status: boolean;
  createdAt: string;
}

interface Lesson {
  createUser: string;
  title: string;
  course: string;
  video: string;
}

interface SingleCourseState {
  coursname: string;
  file?: any;
  _id: string;
  employee: EmployeeType;
  category: any;
  price: number;
  photo?: any;
  createdAt?: string;
}

interface CourseState {
  myCourses: any[];
  fetched: Boolean;
  myCourse: () => Promise<void>;
}

const myCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      myCourses: [],
      fetched: false,
      myCourse: async () => {
        const { fetched } = get();
        if (!fetched) {
          try {
            const response = await axiosInstance.get("/myLesson");
            const { data } = response.data;
            set({ myCourses: data, fetched: true });
          } catch (error) {
            const { status, message } = handleApiError(error);
            console.error(`Error (${status}): ${message}`);
          }
        }
      },
    }),
    {
      name: "myCourse",
    }
  )
);

export default myCourseStore;

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
  course: SingleCourseState[];
  fetched: Boolean;
  getCourse: () => Promise<void>;
  createCourse: (data: SingleCourseState) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getSingleCourse: (id: string) => Promise<SingleCourseState>;
  updateCourse: (id: string, data: SingleCourseState) => Promise<void>;
  getCourseLessons: (id: string) => Promise<Lesson[]>;
}

const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      course: [],
      fetched: false,
      getCourseLessons: async (id: string) => {
        try {
          const response = await axiosInstance.get(`/course/${id}`);
          return response.data.data;
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      getCourse: async () => {
        const { fetched } = get();
        if (!fetched) {
          try {
            const response = await axiosInstance.get("/course");
            const { data } = response.data;
            set({ course: data, fetched: true });
          } catch (error) {
            const { status, message } = handleApiError(error);
            console.error(`Error (${status}): ${message}`);
          }
        }
      },
      createCourse: async (data: SingleCourseState) => {
        try {
          const response = await axiosInstance.post("/course", data);
          const fetchAgain = get().getCourse;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      deleteCourse: async (id: string) => {
        try {
          const response = await axiosInstance.delete(`/course/${id}`);
          const fetchAgain = get().getCourse;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      getSingleCourse: async (id: string) => {
        try {
          const response = await axiosInstance.get(`/course/${id}`);
          return response.data.data;
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      updateCourse: async (id: string, data: SingleCourseState) => {
        try {
          const response = await axiosInstance.put(`/course/${id}`, data);
          const fetchAgain = get().getCourse;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
    }),
    {
      name: "course",
    }
  )
);

export default useCourseStore;

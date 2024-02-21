import { create } from "zustand";
import axiosInstance from "@/hooks/axios";
import { handleApiError } from "@/error/error";

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
  courseName: string;
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
  fetched: boolean;
  getCourse: () => Promise<void>;
  createCourse: (data: SingleCourseState) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getSingleCourse: (id: string) => Promise<SingleCourseState>;
  updateCourse: (id: string, data: SingleCourseState) => Promise<void>;
  getCourseLessons: (id: string) => Promise<Lesson[]>;
}

const useCourseStore = create<CourseState>((set, get) => ({
  course: [],
  fetched: false,
  getCourseLessons: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  getCourse: async () => {
    const { fetched } = get();
    if (!fetched) {
      try {
        const currentCategory = get().course;
        if (currentCategory.length === 0) {
          const response = await axiosInstance.get("/course");
          const { data } = response.data;
          set({ course: data, fetched: true });
        }
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    }
  },
  createCourse: async (data: SingleCourseState) => {
    try {
      await axiosInstance.post("/course", data);
      set((state) => ({ ...state, fetched: false }));
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  deleteCourse: async (id: string) => {
    try {
      await axiosInstance.delete(`/course/${id}`);
      set((state) => ({ ...state, fetched: false }));
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  getSingleCourse: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  updateCourse: async (id: string, data: SingleCourseState) => {
    try {
      await axiosInstance.put(`/course/${id}`, data);
      set((state) => ({ ...state, fetched: false }));
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
}));

export default useCourseStore;

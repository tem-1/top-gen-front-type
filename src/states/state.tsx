import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/hooks/axios";
import { handleApiError } from "@/error/error";

// Define types/interfaces
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

// Define context and provider
export const CourseContext = createContext<any>(null);

interface CourseProviderProps {
  children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [course, setCourse] = useState<SingleCourseState[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [singleNews, setSingleNews] = useState("");
  const [singleCourse, setSingleCourse] = useState<SingleCourseState[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [lesson, setLesson] = useState<Lesson[]>([]);
  const [myLesson, setMyLesson] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [lastViewVideo, setVideo] = useState([]);
  const [additional, setAdditional] = useState();
  const [courseComment, setCourseCmment] = useState([]);
  const token: any =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!fetched) {
      getCourse();
      getAdditional();
      if (token) {
        getMyLesson();
      }
    }
  }, [fetched]);

  const getCourse = async () => {
    try {
      const response = await axiosInstance.get("/course");
      const { data } = response.data;
      setCourse(data);
      setFetched(true);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const getNews = async () => {
    try {
      const response = await axiosInstance.get("/news");
      const { data } = response.data;
      setNews(data);
      setFetched(true);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const getSingleNews = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/news/${id}`);
      const { data } = response.data;
      setSingleNews(data);
      setFetched(true);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const getCourseLessons = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const createCourse = async (data: SingleCourseState) => {
    try {
      await axiosInstance.post("/course", data);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await axiosInstance.delete(`/course/${id}`);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const getSingleCourse = async (id: any) => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      setSingleCourse(response?.data?.data);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const getLesson = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/course/${id}/lesson`);
      setLesson(response?.data?.data);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const getMyLesson = async () => {
    try {
      const res = await axiosInstance.get("/myLesson");
      setFetched(true);
      setMyLesson(res?.data?.data);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const updateCourse = async (id: string, data: SingleCourseState) => {
    try {
      await axiosInstance.put(`/course/${id}`, data);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const getAdditional = async () => {
    try {
      const res = await axiosInstance.get("/additional");
      setFetched(true);
      setAdditional(res?.data?.data);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const getCourseComments = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/course/${id}/comment`);
      setFetched(false);
      setCourseCmment(res?.data?.data);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const contextValue = {
    course,
    lesson,
    lastViewVideo,
    allUser,
    getLesson,
    getMyLesson,
    myLesson,
    getNews,
    getSingleNews,
    news,
    singleNews,
    singleCourse,
    fetched,
    getCourse,
    createCourse,
    deleteCourse,
    getSingleCourse,
    updateCourse,
    getCourseLessons,
    additional,
    getAdditional,
    getCourseComments,
    courseComment,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

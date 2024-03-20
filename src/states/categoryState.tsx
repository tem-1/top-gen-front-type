import React, { createContext, useContext, useState, useEffect } from "react";
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
export const CategoryContext = createContext<any>(null);

interface CourseProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CourseProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<SingleCourseState[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const token: any =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!fetched) {
      getCategory();
    }
  }, [fetched]);

  const getCategory = async () => {
    try {
      const response = await axiosInstance.get("/category");
      const { data } = response.data;
      setCategory(data);
      setFetched(true);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const singleCategory = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/category/${id}`);
      setCategory(response?.data?.data);
      setFetched(false);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  const contextValue = {
    category,
    getCategory,
    singleCategory,
    fetched,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

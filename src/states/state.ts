import create, { SetState } from "zustand";
import { Course } from "@/types/type";

const url = "http://localhost:9090/api/v1/";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface State {
  users: User[];
  courseData: Course[];
  fetchUsers: () => Promise<{ error: boolean; message?: string }>;
  fetchCourseData: () => Promise<{ error: boolean; message?: string }>;
}

const useStore = create<State>((set: SetState<State>) => ({
  users: [],
  courseData: [],
  fetchUsers: async () => {
    try {
      const response = await fetch(`${url}user`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      set((state) => ({ ...state, users: data.data }));
      return { error: false };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { error: true };
    }
  },
  fetchCourseData: async () => {
    try {
      const response = await fetch(`${url}course`);
      if (!response.ok) {
        throw new Error("Failed to fetch course data");
      }
      const data = await response.json();
      set((state) => ({ ...state, courseData: data.data }));
      return { error: false };
    } catch (error) {
      console.error("Error fetching course data:", error);
      return { error: true };
    }
  },
}));

export default useStore;

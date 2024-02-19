import { create } from "zustand";
import axiosInstance from "@/utils/axios/axios";
import { handleApiError } from "@/utils/error/error";
import { persist } from "zustand/middleware";
import { setRealData, getRealData } from "@/utils/storage/utils";
import { showMessage, showMessageError } from "@/components/Notify/Notify";
import { useRouter } from "next/router";

interface SingleUserState {
  firstname: string;
  registerNumber: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "user" | "admin" | "operator";
  photo: string;
  status: boolean;
}

interface UserState {
  user: SingleUserState | null;
  getUser: () => Promise<void>;
  createUser: (data: SingleUserState) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getSingleUser: (id: string) => Promise<SingleUserState>;
  updateUser: (id: string, data: SingleUserState) => Promise<void>;
  login: (data: any, router: any) => Promise<void>;
  register: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
}

const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      user: null,
      login: async (data: any, router: any) => {
        try {
          const response = await axiosInstance.post("/user/login", data);
          const token = response.data.token;
          setRealData("token", token);
          set({ user: response.data.data });
          showMessage({ message: "Амжилттай нэвтэрлээ" });
          router.push("/apps/invoice/list");
        } catch (error: any) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
          console.log(error);
          showMessageError({ message: error?.response?.data?.msg });
        }
      },
      register: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        try {
          const loginData = {
            email: email,
            password: password,
          };
          const response = await axiosInstance.post(
            "/user/register",
            loginData
          );
          showMessage({ message: "Амжилттай бүртгэгдлээ" });
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      getUser: async () => {},
      createUser: async (data: SingleUserState) => {
        try {
          const response = await axiosInstance.post("/category", data);
          const fetchAgain = get().getUser;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      deleteUser: async (id: string) => {
        try {
          const response = await axiosInstance.delete(`/category/${id}`);
          const fetchAgain = get().getUser;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      getSingleUser: async (id: string) => {
        try {
          const response = await axiosInstance.get(`/category/${id}`);
          return response.data.data;
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
      updateUser: async (id: string, data: SingleUserState) => {
        try {
          const response = await axiosInstance.put(`/category/${id}`, data);
          const fetchAgain = get().getUser;
          fetchAgain();
        } catch (error) {
          const { status, message } = handleApiError(error);
          console.error(`Error (${status}): ${message}`);
        }
      },
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;

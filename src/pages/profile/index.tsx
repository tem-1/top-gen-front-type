import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { imgUrl } from "@/hooks/img";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/hooks/axios";

interface ProfilepageProps { }

const Profilepage: FunctionComponent<ProfilepageProps> = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  const notify = (name: string) => toast.success(name);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }
  }, []);

  const [form, setFormValue] = useState<any>({
    email: "",
    password: "",
    phone: "",
    registerNumber: "",
    confPass: "",
    firstname: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("phone", form.phone);
      formData.append("registerNumber", form.registerNumber);
      formData.append("firstname", form.firstname);
      formData.append("name", form.name);

      await axiosInstance
        .put(`/customer/${userInfo._id}`, formData)
        .then((res) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data.data));
          notify("Амжилттай");
        });

      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error: any) {
      notifyError("Алдаа гарлаа");
      console.error("There was a problem with the request:", error.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValue({
      ...form,
      [name]: value,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="h-[120px] w-full mainColor">
        <h1 className="font-semibold container text-white text-2xl flex h-full items-center">
          Хувийн мэдээлэл
        </h1>
      </div>
      <div className="container mt-12">
        <div className="border grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-2 col-span-2 border">
            <div className="w-full flex flex-col items-center p-8">
              <h1 className="text-2xl font-medium mb-2">Хувийн мэдээлэл</h1>
              <h1 className="text-sm">Өөрийн мэдээллээ өөрчлөх</h1>{" "}
            </div>
            <form className="p-8" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="row-span-3 border flex flex-col">
                  <div className="w-full flex justify-center mt-12">
                    <Image
                      className="max-w-[200px] rounded-full"
                      width={240}
                      height={250}
                      src={`${imgUrl}/${userInfo?.photo}`}
                      alt="user profile"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Овог нэр:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.firstname}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нэр:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.name}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Утас:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.phone}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Имэйл:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="registerNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Регистрийн дугаар:
                  </label>
                  <input
                    type="text"
                    id="registerNumber"
                    name="registerNumber"
                    value={form.registerNumber}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.registerNumber}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нууц үг:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*************"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confPass"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нууц үг давтах:
                  </label>
                  <input
                    type="password"
                    id="confPass"
                    name="confPass"
                    value={form.confPass}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*************"
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-2">
                {" "}
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Мэдээлэл өөрчлөх
                </button>
                <button
                  type="button"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={logout}
                >
                  Гарах
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profilepage;

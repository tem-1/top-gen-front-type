import React, { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { imgUrl } from "../components/cards/CourseCard";
interface ProfilepageProps {}

const Profilepage: FunctionComponent<ProfilepageProps> = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Check if localStorage is defined before accessing it
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }
  }, []);
  console.log("user", userInfo);
  return (
    <Layout>
      <div className=" h-[120px] w-full  mainColor">
        <h1 className="font-semibold container text-white text-2xl flex h-full items-center">
          Хувийн мэдээлэл
        </h1>
      </div>
      <div className="container mt-12">
        <div className=" border grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-2 col-span-2 border">
            <div className=" w-full flex flex-col items-center p-8">
              <h1 className=" text-2xl font-medium mb-2">Хувийн мэдээлэл</h1>
              <h1 className=" text-sm">Өөрийн мэдээллээ өөрчлөх</h1>{" "}
            </div>
            <form className="p-8">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="row-span-3  border flex flex-col ">
                  <div className="w-full flex justify-center mt-12 ">
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
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Овог нэр:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.firstname}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нэр:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.name}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Утасны дугаар:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.phone}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Регистрийн дугаар:
                  </label>
                  <input
                    type="url"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.registerNumber}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Имэйл:
                  </label>
                  <input
                    type="email"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={userInfo?.email}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нууц үг:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••••"
                    required
                  />
                </div>{" "}
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Нууц үг давтах:
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Мэдээлэл өөрчлөх
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profilepage;

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader";
import { useCourseContext } from "@/states/state";
import Footer from "./components/Footer";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { toast } from "react-toastify";

export default function Home() {
  const { increaseCartQuantity } = useShoppingCart();
  const categories = [
    {
      name: "Математик",
    },
    {
      name: "Англи хэл",
    },
    {
      name: "Солонгос хэл",
    },
    {
      name: "Физик",
    },
    {
      name: "Хөгжим бүжиг",
    },
    {
      name: "Биологи",
    },
  ];
  const { course } = useCourseContext();
  const [filteredData, setFilteredData] = useState(course);
  useEffect(() => {
    setFilteredData(course);
  }, [course]);

  //search code
  const [searchParams, setSearchParams] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchParams(searchTerm);
    if (!searchTerm) {
      setFilteredData(course);
    } else {
      const filter = course.filter((list: any) =>
        list?.coursname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filter);
    }
  };
  // end duusna
  const [loading, setLoading] = useState(true);
  const delay = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full bg-[#F1F7F8]">
          <Navbar />
          <div className="flex w-full container min-h-screen mt-8 gap-4 md:flex-row flex-col mb-20">
            <div className="w-full md:w-[30%] flex flex-col items-center py-8 bg-white rounded-xl px-16 h-auto">
              <span className="w-full">Ангилал </span>
              <div className="flex flex-col gap-2 mt-4 w-full">
                {categories.map((list, index) => {
                  return (
                    <span className="flex gap-2 justify-between w-full group  items-center text-sm font-light text-gray-500 hover:underline cursor-pointer uppercase">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border group-hover:bg-gray-300 "></div>
                        {list.name}
                      </div>
                      <span className="text-black">(3)</span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="md:w-[70%] w-full flex flex-col gap-4">
              {course.map((list: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-full h-[200px] bg-white rounded-xl flex p-4"
                  >
                    <img
                      src={`https://topgeniuses.tanuweb.cloud/uploads/${list?.photo}`}
                      alt=""
                      className="h-full w-[200px] object-cover cursor-pointer rounded"
                    />
                    <div className="flex flex-col w-full px-8 py-2">
                      <span className="text-gray-400 ">
                        {list?.category?.categoryName}
                      </span>

                      <span className="text-sm mt-4 ">{list?.coursname}</span>
                      <div className="w-full flex h-full items-end justify-end">
                        <div className="flex gap-4 items-end">
                          <button
                            className="text-sm bg-[#AF0740] px-4 py-1 text-white rounded-lg"
                            onClick={() => {
                              increaseCartQuantity(list);
                            }}
                          >
                            Сагслах
                          </button>
                          <span>{list?.price} ₮</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

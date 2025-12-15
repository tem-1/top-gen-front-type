import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader";
import { useCourseContext } from "@/states/state";
import Footer from "./components/Footer";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCategoryContext } from "@/states/categoryState";
import { IoArrowBack, IoBasket } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ShoppingBasketIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { cat } = router.query;
  const initialPage = parseInt(router.query.page as string, 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 5; // Adjust number of items per page as needed
  const { increaseCartQuantity } = useShoppingCart();
  const { course } = useCourseContext();
  const { category, getCategory } = useCategoryContext();
  const [filteredData, setFilteredData] = useState(course);
  useEffect(() => {
    if (cat) {
      setFilteredData(course.filter((list: any) => cat == list?.category?._id));
    } else {
      setFilteredData(course);
    }
    getCategory();
    window.scrollTo(0, 0);
  }, [course, router, cat, currentPage]);

  const [loading, setLoading] = useState(true);
  const delay = setTimeout(() => {
    setLoading(false);
  }, 1000);
  //page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

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
                <span
                  className="text-sm w-full text-end hover:underline cursor-pointer"
                  onClick={() => router.push("/lesson")}
                >
                  Бүгдийг үзэх ({course?.length})
                </span>
                {category.map((list: any, index: any) => {
                  return (
                    <Link href={`/lesson?cat=${list._id}`} key={index}>
                      <span className="flex gap-2 justify-between w-full group  items-center text-sm font-light text-gray-500 hover:underline cursor-pointer uppercase">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border group-hover:bg-gray-300 "></div>
                          {list.categoryName}
                        </div>
                        <span className="text-black">(3)</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="md:w-[70%] w-full flex flex-col gap-4">
              {currentItems.length > 0 ? (
                currentItems.map((list: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-[200px] bg-white rounded-xl flex p-4"
                    >
                      <img
                        src={`https://http://topgenius.tanusoft.mn/uploads/${list?.photo}`}
                        alt=""
                        className="h-full w-[200px] object-cover cursor-pointer rounded"
                      />
                      <div className="flex flex-col w-full px-8 py-2">
                        <span className="hidden md:block text-gray-400 ">
                          {list?.category?.categoryName}
                        </span>

                        <span className="hidden md:block text-sm mt-2 md:mt-4 ">
                          {list?.coursname}
                        </span>
                        <span className="block md:hidden text-sm mt-2 md:mt-4 ">
                          {list?.coursname?.length > 40
                            ? list?.coursname?.slice(0, 40) + "..."
                            : list?.coursname}
                        </span>
                        <span className="coursePrice ">{list?.price} ₮</span>
                        <div className="w-full flex h-full items-end justify-end">
                          <div className="flex gap-4 items-center md:items-end">
                            <button
                              className="text-sm hidden md:block bg-[#AF0740] px-4 py-1 text-white rounded-lg"
                              onClick={() => {
                                increaseCartQuantity(list);
                              }}
                            >
                              Сагслах
                            </button>
                            <div
                              className="bg-[#AF0740] text-white p-1 md:hidden block rounded-lg "
                              onClick={() => {
                                increaseCartQuantity(list);
                              }}
                            >
                              <ShoppingBasketIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full bg-white rounded-xl flex p-4 flex-col items-center pt-20">
                  <span className="text-gray-400 text-sm">
                    Одоогоор хичээл байхгүй байна
                  </span>
                </div>
              )}

              {filteredData.length > 0 ? (
                <div className="w-full text-sm flex items-center justify-between gap-4 bg-white py-6 rounded-xl px-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (currentPage > 0) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  >
                    <IoIosArrowBack size={20} />
                  </div>
                  <div className="flex items-center justify-center ">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2  cursor-pointer rounded hover:bg-gray-300 ${
                          currentPage === index + 1
                            ? "bg-[#AF0740] text-white"
                            : "bg-white text-black"
                        } border-gray-300`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  >
                    <IoIosArrowForward size={20} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

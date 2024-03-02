import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/hooks/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imgUrl } from "@/hooks/img";
import Link from "next/link";
import { useRouter } from "next/router";
type CartItem = {
  _id: string;
  name: string;
  coursname: string;
  price: number;
  photo: string;
  category: string;
  quantity: number;
  employee: any;
};
const Qr: React.FC<{ cartItems: any[] }> = ({ cartItems }) => {
  const router = useRouter();
  const [imageData, setImageData] = useState<string>("");
  const [senderCode, setSenderCode] = useState<any>();
  const [bankPhotos, setBankPhotos] = useState<any>([]);

  console.log(" banknii zuragnuuud : ", bankPhotos);
  useEffect(() => {
    const qpay = async () => {
      try {
        if (cartItems && cartItems.length > 0) {
          const c = cartItems.map((el) => ({ _id: el._id }));
          console.log("course _id :", c);
          const invoiceRes = await axios.post(
            "https://topgeniuses.tanuweb.cloud/api/v1/invoice",
            {
              Course: c,
            }
          );
          console.log(" new invoice : ", invoiceRes.data.data);
          const invoice_id: any = invoiceRes.data.data._id;
          const token = localStorage.getItem("token");

          const response = await axios.post(
            `https://topgeniuses.tanuweb.cloud/api/v1/qpayRent/${invoice_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(
            " ******************************* ",
            response.data.data.urls
          );
          setBankPhotos(response.data.data.urls);
          if (
            response.data &&
            response.data.invoice &&
            response.data.invoice.sender_invoice_id
          ) {
            setSenderCode(response.data.invoice.sender_invoice_id);
            const dataUrl = `data:image/png;base64,${response.data.data.qr_image}`;
            setImageData(dataUrl);
          } else {
            console.error("Invalid response structure:", response.data);
          }
        } else {
          console.error("Cart items array is empty or null:", cartItems);
        }
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };
    qpay();
  }, [cartItems]);

  const notifyError = (error: string) => toast.error(error);
  const notifySuccess = (message: string) => toast.success(message);

  console.log("state dotor hadgalsan", senderCode);
  const checkPayment = async () => {
    try {
      const response = await axiosInstance.get(
        `/qpayRent/callback/${senderCode}`
      );
      notifySuccess(response.data.message);
      if (response) {
        localStorage.removeItem("shopping-cart");
        router.push(`/myCourses`);
      }
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
  };
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <div className=" ">
      {loading ? (
        <div role="status" className=" m-8">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="">
          {imageData && (
            <Image
              width={300}
              height={300}
              src={imageData}
              alt="Base64 Image"
              className="h-200 w-200"
            />
          )}
          <div className=" grid grid-cols-4 mt-4 ">
            {bankPhotos.map((bank: any, index: any) => (
              <div key={index} className="flex">
                <Link href={bank?.link}>
                  <Image
                    className="p-1  rounded-3xl"
                    key={index}
                    src={bank.logo}
                    width={50}
                    height={50}
                    alt={`${bank.name} logo`}
                  />
                </Link>
              </div>
            ))}
          </div>
          <button
            onClick={checkPayment}
            className="p-2 bg-blue-400 rounded-md my-4"
          >
            Төлбөр шалгах
          </button>
        </div>
      )}
    </div>
  );
};

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useShoppingCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (total: any, item: any) => total + item.price,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  return (
    <Layout>
      <ToastContainer />
      <div className="container mx-auto mt-8 px-4">
        {cartItems.length === 0 ? (
          <p>Таны сагс хоосон байна</p>
        ) : (
          <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold mb-4">Сагс</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left font-semibold">Зураг</th>
                          <th className="text-left font-semibold">Хичээлүүд</th>
                          <th className="text-left font-semibold">Үнэ</th>
                          <th className="text-left font-semibold">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item: any) => (
                          <tr key={item._id}>
                            <td className="py-4">
                              <div className="flex items-center">
                                <Image
                                  width={300}
                                  height={300}
                                  className="h-16 w-16 mr-4"
                                  src={`${imgUrl}/${item.photo}`}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4"> {item.coursname} </td>
                            <td className="py-4">{item.price}₮</td>
                            <td className="py-4">
                              <Button
                                className="bg-[#FD3F00] rounded-md flex h-full w-[50px] justify-center items-center"
                                onClick={() => removeFromCart(item._id)}
                              >
                                {"хасах"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="md:w-1/4">
                  <div
                    className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold"> Анхааруулга: </strong>
                    <span className="block sm:inline">
                      Төлбөр төлсний дараа заавал төлбөр шалгах товчыг дарж
                      төлбөрөө шалгахыг анхаарна уу !
                    </span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Төлбөр</h2>
                    <hr className="my-2" />
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Нийт үнэ</span>
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                    <button
                      onClick={() => setShowQr(true)}
                      className="primary-button text-white py-2 px-4 rounded-lg mt-4 w-full"
                    >
                      Төлбөр төлөх {showQr && <Qr cartItems={cartItems} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-[500px]  sm:h-[400px] md:h-[300px] lg:h-[250px] "></div>
    </Layout>
  );
};

export default CartPage;

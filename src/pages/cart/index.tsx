import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { imgUrl } from "../components/cards/CourseCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/hooks/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [imageData, setImageData] = useState<string>("");
  const [senderCode, setSenderCode] = useState<any>();

  useEffect(() => {
    const qpay = async () => {
      try {
        if (cartItems && cartItems.length > 0) {
          const c = cartItems.map((el) => ({ _id: el._id }));
          console.log("course _id :", c);
          const invoiceRes = await axios.post(
            "http://localhost:9090/api/v1/invoice",
            {
              Course: c,
            }
          );
          console.log(" new invoice : ", invoiceRes.data);
          const invoice_id: any = invoiceRes.data.data._id;

          const token = localStorage.getItem("token");

          const response = await axios.post(
            `http://localhost:9090/api/v1/qpayRent/${invoice_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
            // Handle the case where the response structure is unexpected
          }
        } else {
          console.error("Cart items array is empty or null:", cartItems);
          // Handle the case where cartItems is empty or null
        }
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        // Handle the error appropriately, e.g., display an error message
      }
    };
    qpay();
  }, [cartItems]);

  const notifyError = (error: string) => toast.error(error); // Error toast function
  const notifySuccess = (message: string) => toast.success(message); // Success toast function

  console.log(" state dotor hadgalsan", senderCode);
  const checkPayment = async () => {
    try {
      const response = await axiosInstance.get(
        `/qpayRent/callback/${senderCode}`
      );
      notifySuccess(response.data.message);
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
  };
  return (
    <div>
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
        <button
          onClick={checkPayment}
          className="p-2 bg-blue-400 rounded-md my-4"
        >
          Төлбөр шалгах
        </button>
      </div>
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
    </Layout>
  );
};

export default CartPage;

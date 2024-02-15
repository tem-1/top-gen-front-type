import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { imgUrl } from "../components/cards/CourseCard";
import axios from "axios";

const invoiceCreate = {};

const Qr: React.FC = () => {
  const [imageData, setImageData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY1YjcyZmI3ODg3MTBkODY5YjA1OWEwMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA3OTYxMjExLCJleHAiOjE3MTA1NTMyMTF9.i8qHsYzvHomLBPR5HhmnifVQf7UOnMqynDxZOrlOKsY"; // Your access token here
        const response = await axios.post(
          "http://localhost:9090/api/v1/qpayRent/65cd7d97ca5a997ed1f0ed76",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Convert base64 string to data URL
        const dataUrl = `data:image/png;base64,${response.data.data.qr_image}`;
        setImageData(dataUrl);

        console.log(response);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {imageData && (
        <img src={imageData} alt="Base64 Image" className="h-200 w-200" />
      )}
    </div>
  );
};

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useShoppingCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showQr, setShowQr] = useState(false);
  console.log("cart items ", cartItems);
  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  return (
    <Layout>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className=" w-auto md:w-[70%]">
              {cartItems.map((item: any) => (
                <div
                  key={item._id}
                  className="border mb-4 p-4 flex items-center"
                >
                  <div className="w-1/3 flex">
                    <Image
                      width={200}
                      height={200}
                      src={`${imgUrl}/${item.photo}`}
                      alt={item.courseTitle}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 ml-4">
                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-2">{item.courseTitle}</p>
                    <div>
                      <button
                        className="bg-rose-700 text-white rounded-lg px-4 py-2 justify-end"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-2">Price: {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Total Price:</h2>
                <p className="text-2xl font-bold">{totalPrice}</p>
                <button
                  onClick={() => setShowQr(true)}
                  className=" bg-yellow-400 p-2 rounded-lg"
                >
                  Төлбөр төлөх
                </button>
                {showQr && <Qr />}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { imgUrl } from "../components/cards/CourseCard";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useShoppingCart();
  let totalPrice;
  useEffect(() => {
    totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
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
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

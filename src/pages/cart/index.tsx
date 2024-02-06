import React, { useContext } from "react";
import { Store } from "@/context/Store";
import Layout from "../components/Layout/Layout";
import Image from "next/image";

const CartPage: React.FC = () => {
  const { state } = useContext(Store);
  const { cartItems } = state.cart;

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item: any) => (
              <div key={item._id} className="border p-4">
                <div className="flex justify-between items-center">
                  <Image
                    width={200}
                    height={200}
                    src={item.imageSrc}
                    alt={item.courseTitle}
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600"> Нэр : {item.courseTitle}</p>
                  </div>
                  <div>
                    <p>Үнэ: {item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

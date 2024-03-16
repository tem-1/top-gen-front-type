import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => {
  const { cartItems } = useShoppingCart();

  return (
    <div className="mr-4">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <Link href="/cart">
          <ShoppingCart />
        </Link>
        <div className="w-4 h-4 font-semibold rounded-full bg-green-500 absolute top-1 right-0 text-xs flex items-center justify-center text-white">
          {cartItems.length}
        </div>
      </div>
    </div>
  );
};

export default Cart;

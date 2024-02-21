import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  return (
    <div className="mr-4">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <Link href="/cart">
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default Cart;

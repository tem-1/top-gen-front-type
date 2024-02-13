import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  [x: string]: number;
  _id: any;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (_id: string) => number;
  increaseCartQuantity: (itemToAdd: any) => void;
  decreaseCartQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [] // Initialize as an empty array
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(_id: string) {
    return cartItems.find((item) => item._id === _id)?.quantity || 0;
  }

  function increaseCartQuantity(itemToAdd: CartItem) {
    setCartItems((currItems: any) => {
      const existingItem = currItems.find(
        (item: any) => item._id === itemToAdd._id
      );
      if (!existingItem) {
        return [...currItems, itemToAdd];
      } else {
        return currItems.map((item: any) => {
          if (item._id === itemToAdd._id) {
            return { ...item, quantity: item.quantity + itemToAdd.quantity };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(_id: string) {
    setCartItems((currItems: any) => {
      if (currItems.find((item: any) => item._id === _id)?.quantity === 1) {
        return currItems.filter((item: any) => item._id !== _id);
      } else {
        return currItems.map((item: any) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(_id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== _id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

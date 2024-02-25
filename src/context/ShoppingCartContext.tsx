import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type CartItem = {
  _id: string;
  name: string;
  courseTitle: string;
  price: number;
  photo: string;
  quantity: number; // Add quantity property
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (_id: string) => number;
  increaseCartQuantity: (itemToAdd: CartItem) => void;
  decreaseCartQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const newCartQuantity = cartItems.reduce(
      (quantity: number, item: CartItem) => item.quantity + quantity,
      0
    );
    setCartQuantity(newCartQuantity);
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(_id: string) {
    return cartItems.find((item: CartItem) => item._id === _id)?.quantity || 0;
  }

  function increaseCartQuantity(itemToAdd: CartItem) {
    setCartItems((currItems: CartItem[]) => {
      const existingItem = currItems.find(
        (item: CartItem) => item._id === itemToAdd._id
      );
      if (!existingItem) {
        return [...currItems, { ...itemToAdd, quantity: 1 }];
      } else {
        return currItems.map((item: CartItem) => {
          if (item._id === itemToAdd._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(_id: string) {
    setCartItems((currItems: CartItem[]) => {
      const existingItem = currItems.find((item: CartItem) => item._id === _id);
      if (existingItem && existingItem.quantity > 1) {
        return currItems.map((item: CartItem) => {
          if (item._id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      } else {
        return currItems.filter((item: CartItem) => item._id !== _id);
      }
    });
  }

  function removeFromCart(_id: string) {
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item: CartItem) => item._id !== _id);
    });
  }

  const value = {
    openCart,
    closeCart,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartQuantity,
    cartItems,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

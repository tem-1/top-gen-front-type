import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (_id: string) => number;
  increaseCartQuantity: (itemToAdd: any) => void;
  decreaseCartQuantity: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  cartQuantity: number;
  cartItems: any;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<any>(
    "shopping-cart",
    [] // Initialize as an empty array
  );
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Calculate cart quantity whenever cartItems change
    const newCartQuantity = cartItems.reduce(
      (quantity: any, item: any) => item.quantity + quantity,
      0
    );
    setCartQuantity(newCartQuantity);
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(_id: string) {
    return cartItems.find((item: any) => item._id === _id)?.quantity || 0;
  }

  function increaseCartQuantity(itemToAdd: any) {
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
    setCartItems((currItems: any) => {
      return currItems.filter((item: any) => item._id !== _id);
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

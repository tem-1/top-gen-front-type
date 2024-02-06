import React, { createContext, useReducer } from "react";

export const Store = createContext<any>(null); // Adjust any as per your state shape
const initialState = {
  cart: { cartItems: [] },
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: any) => item.item_id === newItem.item_id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
            item.item_id === existItem.item_id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item: any) => item.item_id !== action.payload.item_id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

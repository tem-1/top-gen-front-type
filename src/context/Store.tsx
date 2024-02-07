import React, { createContext, useReducer } from "react";

interface Item {
  item_id: string;
  quantity: number;
  // Add any other properties you need
}

interface State {
  cart: {
    cartItems: Item[];
  };
}

interface Action {
  type: string;
  payload: Item;
}

export const Store = createContext<any>(null); // Adjust any as per your state shape

const initialState: State = {
  cart: { cartItems: [] },
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItemIndex = state.cart.cartItems.findIndex(
        (item) => item.item_id === newItem.item_id
      );
      return {
        ...state,
        cart: { cartItems: [...state.cart.cartItems, newItem] },
      };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.item_id !== action.payload.item_id
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

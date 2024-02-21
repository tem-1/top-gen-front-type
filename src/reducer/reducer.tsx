import { createStore } from "redux";
import { AnyAction } from "redux";

// Define the CartItem interface
interface CartItem {
  _id: string;
  name: string;
  coursname: string;
  price: number;
  photo: string;
  category: string;
  quantity: number;
  employee: any;
}

// Define the state interface
interface AppState {
  cart: CartItem[];
}

// Define the action interface
interface AddToCartAction extends AnyAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

// Combine the action and state interfaces
type RootState = AppState & {
  [key: string]: any;
};

type AppAction = AddToCartAction | AnyAction;

// Define the reducer
const reducer = (
  state: RootState = initialState,
  action: AppAction
): RootState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

const initialState: AppState = {
  cart: [],
};

const makeStore = () => createStore(reducer);

export default makeStore;

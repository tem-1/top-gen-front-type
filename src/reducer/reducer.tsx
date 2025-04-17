import { createStore } from "redux";
import { AnyAction } from "redux";

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

interface AppState {
  cart: CartItem[];
}

interface AddToCartAction extends AnyAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

type RootState = AppState & {
  [key: string]: any;
};

type AppAction = AddToCartAction | AnyAction;

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

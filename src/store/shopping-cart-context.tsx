import { createContext, ReactNode, useContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export type CartItem = {
  id: string;
  image?: string;
  title: string;
  price: number;
  description?: string;
  quantity?: number;
};

export type CartState = {
  items: CartItem[];
};

type CartContextValue = CartState & {
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
};

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCartContext() {
  const cartCtx = useContext(CartContext);

  if (cartCtx === null) {
    throw new Error("Cart context state error occurred");
  }

  return cartCtx;
}

type AddAction = {
  type: "ADD_ITEM";
  payload: string;
};

type RemoveAction = {
  type: "REMOVE_ITEM";
  payload: string;
};

type Actions = AddAction | RemoveAction;

function cartReducer(state: CartState, action: Actions): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex(
        (item) => item.id === action.payload
      );

      if (existingIndex !== -1) {
        const existingItem = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
      } else {
        const product = DUMMY_PRODUCTS.find((p) => p.id === action.payload);
        if (product) {
          updatedItems.push({
            ...product,
            quantity: 1,
          });
        }
      }

      return { items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const updatedItems = [...state.items];
      const index = updatedItems.findIndex(
        (item) => item.id === action.payload
      );

      if (index === -1) return state;

      const item = updatedItems[index];
      if (item.quantity && item.quantity > 1) {
        updatedItems[index] = {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        updatedItems.splice(index, 1);
      }

      return { items: updatedItems };
    }

    default:
      return state;
  }
}

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const ctx: CartContextValue = {
    items: state.items,
    onAdd: (id: string) => dispatch({ type: "ADD_ITEM", payload: id }),
    onRemove: (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id }),
  };

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}

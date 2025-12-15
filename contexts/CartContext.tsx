"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isDigital: boolean;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean };

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "studentshop_cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      let newItems: CartItem[];

      if (existingIndex > -1) {
        // Update quantity if item exists
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity < 1) {
        return cartReducer(state, {
          type: "REMOVE_ITEM",
          payload: action.payload.id,
        });
      }

      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        itemCount: 0,
        subtotal: 0,
      };

    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: action.payload.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        isLoading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  isLoading: true,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const items = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: items });
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.isLoading]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${Date.now()}`;
    dispatch({ type: "ADD_ITEM", payload: { ...item, id } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const isInCart = (productId: string) => {
    return state.items.some((item) => item.productId === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = state.items.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;

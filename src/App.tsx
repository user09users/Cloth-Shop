import { useState } from "react";

import Header from "./components/Header.js";
import Shop from "./components/Shop.js";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

export type CartItem = {
  id: string;
  image?: string;
  title: string;
  price: number;
  description?: string;
  quantity?: number;
};
export type CartItems = {
  items: CartItem[];
};

function App() {
  const [shoppingCart, setShoppingCart] = useState<CartItems>({
    items: [],
  });

  function handleAddItemToCart(id: string) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem && existingCartItem.quantity) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product: CartItem) => product.id === id
        );
        if (product) {
          updatedItems.push({
            id: id,
            title: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      if (updatedItem.quantity) {
        updatedItem.quantity += amount;
      }
      if (updatedItem.quantity && updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop onAddItemToCart={handleAddItemToCart} />
    </>
  );
}

export default App;

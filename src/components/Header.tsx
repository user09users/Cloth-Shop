import { useRef } from "react";

import CartModal, { ModalHandle } from "./CartModal.js";
import { useCartContext } from "../store/shopping-cart-context.js";
import { CartItem } from "../store/shopping-cart-context.js";

export default function Header() {
  const modal = useRef<ModalHandle>(null);
  const { items } = useCartContext();

  const cartQuantity = items.reduce((sum, item: CartItem) => {
    if (item.quantity) {
      return sum + item.quantity;
    }

    return items.length;
  }, 0);

  function handleOpenCartClick() {
    if (modal.current) {
      modal.current.open();
    }
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}

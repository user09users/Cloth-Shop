import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import { CartItem } from "../App";

type CartModalProps = {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (productId: string, amount: number) => void;
  title: string;
  actions: ReactNode;
};

export type ModalHandle = {
  open: () => void;
};

const CartModal = forwardRef<ModalHandle, CartModalProps>(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")!
  );
});

export default CartModal;

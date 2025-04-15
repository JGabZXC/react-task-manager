import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ children, ref, buttonCaption, onConfirm }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },

    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <>
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/90 rounded-lg bg-slate-50 p-4 w-[25rem] mt-5 open:mx-auto shadow-lg shadow-slate-950 opacity-0 open:opacity-100 transition-opacity duration-300"
      >
        {children}
        <form method="dialog" className="mt-4 text-right">
          <Button onClick={onConfirm}>{buttonCaption}</Button>
        </form>
      </dialog>
    </>,
    document.querySelector("#modal-root")
  );
}

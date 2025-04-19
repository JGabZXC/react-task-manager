import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  ref,
  buttonCaption,
  onConfirm,
  danger = false,
}) {
  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },

    close() {
      dialog.current.close();
    },
  }));

  let classes;

  if (danger) {
    classes =
      "cursor-pointer py-2 px-4 rounded-md text-red-300 border-2 border-red-300 hover:bg-red-300 hover:text-slate-50 transition-colors duration-300 focus:outline-none";
  } else {
    classes =
      "cursor-pointer py-2 px-4 rounded-md text-slate-500 border-2 border-slate-500 hover:bg-slate-500 hover:text-slate-50 transition-colors duration-300 focus:outline-none";
  }

  return createPortal(
    <>
      <dialog
        ref={dialog}
        className="backdrop:bg-slate-950/90 rounded-lg bg-slate-200 p-4 w-[25rem] mt-5 open:mx-auto shadow-lg shadow-slate-950 opacity-0 open:opacity-100 transition-opacity duration-300"
      >
        {children}
        <form method="dialog" className="flex gap-2 justify-end mt-4">
          <button className={classes} onClick={onConfirm}>
            {buttonCaption}
          </button>
          <button
            className="cursor-pointer py-2 px-4 rounded-md text-slate-500 hover:bg-slate-900 hover:text-slate-50 transition-color duration-300"
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
        </form>
      </dialog>
    </>,
    document.querySelector("#modal-root")
  );
}

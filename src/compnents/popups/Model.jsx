import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Model({ children, open, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModel();
    }
  }, []);

  return createPortal(
    <dialog open={open} ref={dialog} className={`model ${className}`}>
      {children}
    </dialog>,
    document.getElementById("model")
  );
}

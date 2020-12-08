import { useEffect, useRef } from "react";

const useClick = (onClick, trigger) => {
  const element = useRef();

  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, [trigger]);
  return element;
};

export default useClick;

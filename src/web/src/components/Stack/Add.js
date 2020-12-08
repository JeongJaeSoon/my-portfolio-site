import React, { useState, useEffect } from "react";
import { useClick } from "../../hooks";
import ModalStack from "./ModalStack";
import "./Add.css";

const StackAdd = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const addBtn = useClick(() => {
    setModalIsOpen(true);
  }, modalIsOpen);

  return (
    <div className="stack-add">
      <div className="top">
        <button ref={addBtn} className="add-btn">
          +
        </button>
        <ModalStack controller={{ modalIsOpen, setModalIsOpen }} />
      </div>
      <div className="bottom">ADD</div>
    </div>
  );
};

export default StackAdd;

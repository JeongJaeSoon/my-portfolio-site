import React, { useState } from "react";
import { useClick } from "../../hooks";
import ModalStack from "./ModalStack";
import "./Add.css";

const StackAdd = () => {
  // TODO Modal 수정
  const [modalIsOpen, setModalIsOpen] = useState(true);
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

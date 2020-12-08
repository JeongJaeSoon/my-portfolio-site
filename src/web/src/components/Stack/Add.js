import React, { useState } from "react";
import Modal from "react-modal";
import "./Add.css";
import "./ModalStack.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 350,
  },
};

const StackAdd = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // subtitle.style.color = "#6B91FD";
    // subtitle.style.fontSize = "15px";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="stack-add">
      <div className="top">
        <button onClick={openModal} className="add-btn">
          +
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Stack Add"
        >
          <div className="stack-modal">
            <div className="header">
              <div className="sub-title">Add Tech Stack </div>
              <button onClick={closeModal} className="close-btn">
                &#10005;
              </button>
            </div>
            <div className="section">
              <input type="text" className="name" placeholder="이름" />
              <input
                type="file"
                name="stack_img"
                className="img-btn"
                onChange={null}
              />
              <ul>
                <li>
                  <p className="title">숙련도</p>
                  <p className="value">
                    <select name="stack-skillful">
                      <option value="최상">최상</option>
                      <option value="상">상</option>
                      <option value="중상">중상</option>
                      <option value="중">중</option>
                    </select>
                  </p>
                </li>
                <li>
                  <p className="title">사용빈도</p>
                  <p className="value">
                    <input type="text" className="stack-frequency" />
                  </p>
                </li>
                <li>
                  <p className="title">대표색상</p>
                  <p className="value">
                    <input type="color" class="stack-color" value="#000000" />
                  </p>
                </li>
              </ul>
              <button className="save-btn">저장</button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="bottom">ADD</div>
    </div>
  );
};

export default StackAdd;

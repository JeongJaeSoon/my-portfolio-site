import React, { useState } from "react";
import Modal from "react-modal";

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

const ModalStack = ({ controller }) => {
  const { modalIsOpen, setModalIsOpen } = controller;
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const skillfulList = ["최상", "상", "중상", "중", "중하"];
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [skillful, setSkillful] = useState(skillfulList[0]);
  const [frequency, setFrequency] = useState(0);
  const [color, setColor] = useState("#000000");

  const onChangeName = ({ target }) => {
    setName(target.value.toUpperCase());
  };
  const onChangeImg = ({ target }) => {
    console.log(target.files[0]);
    setImgFile(target.files[0]);
  };
  const onChangeSkillFul = ({ target }) => {
    setSkillful(target.value);
  };
  const onChangeFrequency = ({ target }) => {
    const value = parseInt(target.value);
    return isNaN(value)
      ? setFrequency(0)
      : value >= 0 && value <= 100
      ? setFrequency(value)
      : 0;
  };
  const onChangeColor = ({ target }) => {
    setColor(target.value);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
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
          <input
            type="text"
            className="name"
            placeholder="이름"
            value={name}
            onChange={onChangeName}
          />
          <div
            className="img-show"
            style={{
              border: "1px solid red",
              width: "150px",
              height: "150px",
              // background: `url(${img}) center/150px no-repeat`,
            }}
          ></div>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            className="img-btn"
            value={imgFile}
            onChange={onChangeImg}
          />
          <ul>
            <li>
              <p className="title">숙련도</p>
              <p className="value">
                <select
                  name="stack-skillful"
                  value={skillful}
                  onChange={onChangeSkillFul}
                >
                  {skillfulList.map((ele, idx) => {
                    return (
                      <option key={idx} value={ele}>
                        {ele}
                      </option>
                    );
                  })}
                </select>
              </p>
            </li>
            <li>
              <p className="title">사용빈도</p>
              <p className="value">
                <input
                  type="text"
                  className="stack-frequency"
                  value={frequency}
                  onChange={onChangeFrequency}
                />
              </p>
            </li>
            <li>
              <p className="title">대표색상</p>
              <p className="value">
                <input
                  type="color"
                  className="stack-color"
                  value={color}
                  onChange={onChangeColor}
                />
              </p>
            </li>
          </ul>
          <button className="save-btn">저장</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStack;

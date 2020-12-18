import React, { useState } from "react";
import Modal from "react-modal";
import { RequestCreate } from "../../axios";
import { urls } from "../../config";
import "./CareerCreate.css";

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
  const url = urls.career.store;
  const { modalIsOpen, setModalIsOpen } = controller;
  const [date, setDate] = useState("");
  const [career, setCareer] = useState("");

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };
  const onDateHandler = ({ target }) => {
    const { value } = target;
    setDate(value);
  };
  const onCareerHandler = ({ target }) => {
    const { value } = target;
    setCareer(value);
  };

  const onStoreHandler = () => {
    if (date && career) {
      const flag = window.confirm("추가하시겠습니까?");
      if (!flag) {
        return;
      }
      const nextUrl = "/about";
      const formData = new FormData();
      formData.append("date", date);
      formData.append("value", career);
      RequestCreate({ url, nextUrl, formData });
    } else {
      alert("모두 입력하였는지 확인해주세요.");
      return;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Career Add"
    >
      <div className="career-modal">
        <input
          type="text"
          placeholder="날짜"
          value={date}
          onChange={onDateHandler}
        />
        <input
          type="text"
          placeholder="경력"
          value={career}
          onChange={onCareerHandler}
        />
        <button className="save-btn" onClick={onStoreHandler}>
          저장
        </button>
      </div>
    </Modal>
  );
};

export default ModalStack;

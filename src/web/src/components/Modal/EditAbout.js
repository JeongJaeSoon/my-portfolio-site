import React, { useState } from "react";
import Modal from "react-modal";
import { RequestCreate } from "../../axios";
import { urls } from "../../config";

import "./EditAbout.css";

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

const ModalEditAbout = ({ controller }) => {
  const url = urls.about.store;

  const { modalIsOpen, setModalIsOpen } = controller;
  const [main, setMain] = useState("");
  const [region, setRegion] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [introduce, setIntroduce] = useState("");

  if (!modalIsOpen) {
    return <></>;
  }

  const onChangeMain = ({ target }) => {
    setMain(target.value);
  };
  const onChangeRegion = ({ target }) => {
    setRegion(target.value);
  };
  const onChangeTel = ({ target }) => {
    setTel(target.value);
  };
  const onChangeEmail = ({ target }) => {
    setEmail(target.value);
  };
  const onChangeGithub = ({ target }) => {
    setGithub(target.value);
  };
  const onChageIntroduce = ({ target }) => {
    setIntroduce(target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };
  const onStoreHandler = () => {
    const flag = window.confirm("수정하시겠습니까?");
    if (!flag) {
      return;
    }

    const nextUrl = "/about";
    const formData = new FormData();
    main && formData.append("main", main);
    region && formData.append("region", region);
    tel && formData.append("tel", tel);
    email && formData.append("email", email);
    github && formData.append("github", github);
    introduce && formData.append("introduce", introduce);
    RequestCreate({ url, nextUrl, formData });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="About Add"
    >
      <div className="stack-modal">
        <div className="header">
          <div className="sub-title">Edit About</div>
          <button onClick={closeModal} className="close-btn">
            &#10005;
          </button>
        </div>
        <div className="edit-section">
          <div className="txt">수정 희망 항목을 변경해주세요.</div>

          <ul>
            <li>
              <input
                type="text"
                placeholder="소개"
                value={main}
                onChange={onChangeMain}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="거주지"
                value={region}
                onChange={onChangeRegion}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="TEL"
                value={tel}
                onChange={onChangeTel}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="EMAIL"
                value={email}
                onChange={onChangeEmail}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="GITHUB"
                value={github}
                onChange={onChangeGithub}
              />
            </li>
          </ul>
          <textarea
            cols="30"
            rows="10"
            placeholder="자기소개"
            style={{ resize: "none" }}
            value={introduce}
            onChange={onChageIntroduce}
          >
            {introduce}
          </textarea>
          <button className="edit-btn" onClick={onStoreHandler}>
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditAbout;

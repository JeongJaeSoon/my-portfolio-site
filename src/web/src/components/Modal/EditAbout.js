import React, { useState } from "react";
import Modal from "react-modal";
import imageCompression from "browser-image-compression";
import { RequestCreate } from "../../axios";
import { urls } from "../../config";

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
  const url = urls.stack.store;
  const { modalIsOpen, setModalIsOpen } = controller;
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState("");

  const onChangeName = ({ target }) => {
    setName(target.value.toUpperCase());
  };
  const onChangeImg = async ({ target }) => {
    const file = target.files[0];
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 150,
    };

    try {
      const compressedImgFile = await imageCompression(file, options);
      setImgFile(file);
      const promise = imageCompression.getDataUrlFromFile(compressedImgFile);
      promise.then((result) => {
        setImgFileUrl(result);
      });
    } catch (error) {
      alert(error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.reload();
  };
  const onStoreHandler = () => {
    if (imgFile && name) {
      const flag = window.confirm("추가하시겠습니까?");
      if (!flag) {
        return;
      }
      const nextUrl = "/stack";
      const formData = new FormData();
      formData.append("title", name);
      formData.append("img_url", imgFile);
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
      contentLabel="Stack Add"
    >
      <div className="stack-modal">
        <div className="header">
          <div className="sub-title">Edit Profile</div>
          <button onClick={closeModal} className="close-btn">
            &#10005;
          </button>
        </div>
        <div className="edit-section">
          <ul className="left">
            <li>
              <input
                type="text"
                className="name"
                placeholder="소개"
                value={name}
                onChange={onChangeName}
              />
            </li>
            <li>
              <input
                type="text"
                className="name"
                placeholder="거주지"
                value={name}
                onChange={onChangeName}
              />
            </li>
            <li>
              <input
                type="text"
                className="name"
                placeholder="TEL"
                value={name}
                onChange={onChangeName}
              />
            </li>
          </ul>
          <ul className="right">
            <li>
              <input
                type="text"
                className="name"
                placeholder="EMAIL"
                value={name}
                onChange={onChangeName}
              />
            </li>
            <li>
              <input
                type="text"
                className="name"
                placeholder="GITHUB"
                value={name}
                onChange={onChangeName}
              />
            </li>
          </ul>
          <div className="career">
            <input
              type="text"
              className="name"
              placeholder="날짜"
              value={name}
              onChange={onChangeName}
            />
            <input
              type="text"
              className="name"
              placeholder="내용"
              value={name}
              onChange={onChangeName}
            />
            <button>추가</button>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="자기소개"
            style={{ resize: "none" }}
          ></textarea>
          <div
            className="img-show"
            style={{
              width: "150px",
              height: "150px",
              background: `url(${imgFileUrl}) center no-repeat`,
              backgroundSize: "contain",
            }}
          ></div>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            className="img-btn"
            onChange={onChangeImg}
          />
          <button className="save-btn" onClick={onStoreHandler}>
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditAbout;

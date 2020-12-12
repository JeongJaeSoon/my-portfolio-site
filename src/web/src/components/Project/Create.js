import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useAuth } from "../../hooks";
import { StackList } from "../Modal";
import { urls } from "../../config";
import Title from "../Util/Title";

import "./Create.css";

const ProjectCreate = () => {
  const url = urls.stack.list;
  const token = localStorage.getItem("token");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState("");
  const stacks = [];
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
  const { data, error } = useAuth(
    {
      method: "get",
      url,
    },
    token,
  );

  if (error) {
    alert(error);
  }

  if (data) {
    const { stackList } = data.data;
    stackList.map((element) => {
      stacks.push({
        id: element.id,
        title: element.title,
        color: element.color,
      });
    });
  }

  return (
    <>
      {token ? (
        <>
          <Title titleName="Create My Project" />
          <div className="project-create">
            <div className="left">
              <div className="project-title">
                <input type="text" placeholder="프로젝트 명" />
                <input type="url" placeholder="GitHub Repository 주소" />
              </div>
              <div className="project-img">
                <div
                  className="img-show"
                  style={{
                    width: "200px",
                    height: "200px",
                    background: `url(${imgFileUrl}) center/200px no-repeat`,
                  }}
                ></div>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  className="img-btn"
                  onChange={onChangeImg}
                />
              </div>
              <textarea
                cols="27"
                rows="3"
                className="project-desc"
                placeholder="프로젝트 소개글을 작성하세요"
              ></textarea>
            </div>
            <div className="right">
              <div className="project-sub-title">상세 정보</div>
              <ul>
                <li className="stacks">
                  <div className="title">개발 스택</div>
                  <div className="value">
                    <div className="wrapper">
                      <ul className="stack-selected">
                        <li className="stack">a</li>
                        <li className="stack">b</li>
                        <li className="stack">c</li>
                        <li className="stack">d</li>
                        <li className="stack">a</li>
                        <li className="stack">b</li>
                        <li className="stack">c</li>
                        <li className="stack">d</li>
                      </ul>
                      <div className="txt">사용 기술</div>
                    </div>
                    <div className="wrapper">
                      <ul className="stack-list">
                        <li className="stack">a</li>
                        <li className="stack">b</li>
                        <li className="stack">c</li>
                        <li className="stack">d</li>
                        <li className="stack">a</li>
                        <li className="stack">b</li>
                        <li className="stack">c</li>
                        <li className="stack">d</li>
                        <li className="stack">a</li>
                        <li className="stack">b</li>
                        <li className="stack">c</li>
                        <li className="stack">d</li>
                      </ul>
                      <div className="txt">기술 목록</div>
                    </div>
                  </div>
                </li>
                <li className="date">
                  <div className="title">개발 기간</div>
                  <div className="value">
                    <input type="date" className="start-date" />
                    <p>~</p>
                    <input type="date" className="end-date" />
                  </div>
                </li>
                <li className="role">
                  <div className="title">담당 역할</div>
                  <div className="value">
                    <input
                      type="text"
                      placeholder="20자 이내로 작성하세요."
                      maxLength="20"
                    />
                  </div>
                </li>
              </ul>
            </div>
            {/* 
            <div className="img-upload-btn">
              <div className="wrapper">
                <i className="fas fa-image" />
                <span>프로젝트 사진 업로드</span>
              </div>
            </div>
            <div className="project-info">
              <div className="left">
                <ul>
                  <li className="stack">
                    <div className="title">기술 스택</div>
                    <div className="stack-list">
                      {selectedStacks.map((element) => {
                        console.log(element);
                        return (
                          // <div className="stack-item" key={element.id}>
                          <p className="name" key={element.id}>
                            {element.title}
                          </p>
                          // <i className="fas fa-times-circle"></i>
                          // </div>
                        );
                      })}
                    </div>
                    <StackList
                      controller={{ modalIsOpen, setModalIsOpen }}
                      stacks={stacks}
                      selectedStacks={selectedStacks}
                    />
                    <button className="stack-add-btn" ref={listBtn}>
                      추가
                    </button>
                  </li>
                  <li className="date">
                    <div className="title">개발 기간</div>
                    <input type="date" className="start-date" />
                    ~
                    <input type="date" className="end-date" />
                  </li>
                  <li className="role">
                    <div className="title">담당 역할</div>
                    <input
                      type="text"
                      placeholder="20자 이내로 작성하세요."
                      maxLength="20"
                    />
                  </li>
                </ul>
              </div>
              <div className="right">
              </div>
            </div> */}
          </div>
          <button className="create-btn">저장</button>
        </>
      ) : (
        <Redirect path="*" to="/project" />
      )}
    </>
  );
};

export default ProjectCreate;

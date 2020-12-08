import React from "react";
import { Redirect } from "react-router-dom";
import Title from "../Util/Title";

import "./Create.css";

const ProjectCreate = () => {
  const isLogin = localStorage.getItem("token");

  return (
    <>
      {isLogin ? (
        <>
          <Title titleName="Create My Project" />
          <div className="project-create">
            <div className="title">
              <input type="text" placeholder="프로젝트 명" />
              <input type="url" placeholder="GitHub Repository 주소" />
            </div>
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
                      <div className="stack-item">
                        <p className="name">PHP</p>
                        <i className="fas fa-times-circle"></i>
                      </div>
                      <div
                        className="stack-item"
                        style={{ backgroundColor: "red" }}
                      >
                        <p className="name">laravel</p>
                        <i className="fas fa-times-circle"></i>
                      </div>
                    </div>
                    <button className="stack-add-btn">추가</button>
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
                {/* TODO 이벤트로 글자 수 집어나기*/}
                <textarea
                  cols="27"
                  rows="3"
                  className="project-desc"
                  placeholder="프로젝트 소개글을 작성하세요"
                ></textarea>
              </div>
            </div>
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

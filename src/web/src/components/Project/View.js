import React from "react";
import { Link } from "react-router-dom";

const ProjectView = ({ projectId }) => {
  const { id, title, url, stack, date, role } = {
    id: projectId,
    title: "Gochi 2019",
    url: "https://github.com/JeongJaeSoon/Gochi-2019_Java-project",
    stack: ["JAVA", "GitHub"],
    date: "2019.00.00 ~ 2019.00.00",
    role: "안녕하세요안녕하세요안녕하세요안녕하세요",
  };
  const isLogin = localStorage.getItem("token");

  return (
    <div className="view">
      <div className="header">
        <div className="left">
          <p className="title">{title}</p>
          <a target="_blank" rel="noreferrer" href={url} className="url">
            클릭 시, GitHub Repository 로 이동합니다.
          </a>
        </div>
        <div className="right">
          {isLogin ? (
            <>
              <Link to="/project/create">추가</Link>
              <Link to={`/project/modify/${id}`}>수정</Link>
              <Link to={`/project/delete/${id}`}>삭제</Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="section">
        <div className="img"></div>
        <ul className="info">
          <li>
            <span className="title">기술 스택</span>
            <span className="value">
              {stack.map((item, index) => {
                if (index === stack.length - 1) return item;
                return item + ", ";
              })}
            </span>
          </li>
          <li>
            <span className="title">개발 기간</span>
            <span className="value">{date}</span>
          </li>
          <li>
            <span className="title">담당 역할</span>
            <span className="value">{role}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectView;

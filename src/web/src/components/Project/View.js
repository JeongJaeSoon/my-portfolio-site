import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks";
import { urls } from "../../config";

const ProjectView = ({ projectId }) => {
  const [id, setId] = useState(projectId);

  if (projectId !== id) {
    setId(projectId);
  }

  const url = urls.project.show + id;
  const { loading, error, data } = useAxios(
    {
      method: "get",
      url,
    },
    id,
  );

  if (loading || error) {
    return (
      <div className="view">
        <div className="loading">
          {loading
            ? "로딩중입니다"
            : error
            ? "상세정보 조회에 실패하였습니다."
            : ""}
        </div>
      </div>
    );
  }

  const {
    // id,
    title,
    repo_url,
    img_url,
    start_date,
    end_date,
    role,
    // stacks,
  } = data.data.project;
  const isLogin = localStorage.getItem("token");

  const stacks = ["aa", "bb", "cc"];
  return (
    <div className="view">
      <div className="header">
        <div className="left">
          <p className="title">{title}</p>
          <a target="_blank" rel="noreferrer" href={repo_url} className="url">
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
              {stacks.map((item, index) => {
                if (index === stacks.length - 1) return item;
                return item + ", ";
              })}
            </span>
          </li>
          <li>
            <span className="title">개발 기간</span>
            <span className="value">
              {start_date.split(" ")[0]} ~ {end_date.split(" ")[0]}
            </span>
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useAxios } from "../../hooks";
import { urls } from "../../config";

const ProjectView = ({ projectId }) => {
  const [id, setId] = useState(projectId);
  const url = urls.project.show + id;
  const token = localStorage.getItem("token");

  if (projectId !== id) {
    setId(projectId);
  }

  const { loading, error, data } = useAxios(
    {
      method: "get",
      url,
    },
    id,
  );

  if (!projectId) {
    return (
      <div className="view" style={{ position: "relative" }}>
        <p
          style={{
            lineHeight: "10",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
          }}
        >
          {token ? "추가" : "로그인 후, 프로젝트를 추가할 수 있습니다."}
        </p>
      </div>
    );
  }

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

  const onDeleteHandler = () => {
    const flag = window.confirm("삭제하시겠습니까?");
    if (!flag) {
      return;
    }

    const authAxios = Axios.create({
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const options = {
      method: "delete",
      url,
    };
    authAxios(options)
      .then((data) => {
        if (data && data.status === 200) {
          const { msg } = data.data;
          alert(msg);
          window.location.href = "/project";
        }
      })
      .catch((error) => {
        if (error.response) {
          const {
            status,
            data: { message },
          } = error.response;

          return status === 401
            ? alert(message)
            : alert("삭제에 실패하였습니다.");
        }
        return;
      });
    return;
  };
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
          {token ? (
            <>
              <Link to="/project/create" className="project-menu">
                추가
              </Link>
              <Link to={`/project/modify/${id}`} className="project-menu">
                수정
              </Link>
              <div className="project-menu" onClick={onDeleteHandler}>
                삭제
              </div>
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

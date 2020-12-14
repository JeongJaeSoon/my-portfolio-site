import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, projectId }) => {
  const token = localStorage.getItem("token");
  if (!projects && !projectId) {
    return (
      <div className="list" style={{ position: "relative" }}>
        <p
          className="msg"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Noto sans, sans-serif",
            fontWeight: 300,
          }}
        >
          {token ? "프로젝트를 추가해주세요." : "등록된 프로젝트가 없습니다."}
        </p>
      </div>
    );
  }
  return (
    <div className="list">
      <div className="list-title">My Project List</div>
      <div className="list-wrapper">
        {projects.map(({ id, title, content }) => {
          return (
            <div
              className={`list-content ${
                id === parseInt(projectId) ? "project-selected" : ""
              }`}
              key={id}
            >
              <Link to={`/project/${id}`} className="project-title">
                {title}
              </Link>
              <p className="project-content">{content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;

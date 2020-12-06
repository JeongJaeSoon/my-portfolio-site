import React from "react";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, projectId }) => {
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

import React from "react";
import { Redirect } from "react-router-dom";
import { useAxios } from "../../hooks";
import { urls } from "../../config";
import Loading from "../Util/Loading";
import Title from "../Util/Title";
import List from "./List";
import View from "./View";

import "./Home.css";

const ProjectHome = ({ match }) => {
  const url = urls.project.index;
  const { loading, error, data } = useAxios({
    method: "get",
    url,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    alert("데이터 조회에 실패하였습니다.");
    return <Redirect path="/project/*" to="/" />;
  }

  const { projects } = data.data;
  const projectId = match.params.projectId || projects[0].id;

  return (
    <>
      {isNaN(projectId) ? (
        <Redirect path="/project/*" to="/project" />
      ) : (
        <>
          <Title titleName="My Project" />
          <div className="project-home">
            <List projects={projects} projectId={projectId} />
            <View projectId={projectId} />
          </div>
        </>
      )}
    </>
  );
};

export default ProjectHome;

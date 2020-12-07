import React from "react";
import { Redirect } from "react-router-dom";
import { useAxios } from "../../hooks";
import { urls } from "../../config";
import Loading from "../Loading";
import List from "./List";
import View from "./View";
import Title from "../Title";

import "./Home.css";

const ProjectHome = ({ match }) => {
  const url = urls.project.index;
  const { loading, error, data, refetch } = useAxios({
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

  // const project = useAxios({
  //   method: "get",
  //   url: urls.project.show + projectId,
  // });

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

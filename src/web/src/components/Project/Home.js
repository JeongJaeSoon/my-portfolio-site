import React from "react";
import List from "./List";
import View from "./View";

const ProjectHome = ({ match }) => {
  const projectId = match.params.projectId || 1;
  console.log(projectId);
  return (
    <div>
      <List />
      <View />
    </div>
  );
};

export default ProjectHome;

import React from "react";
import List from "./List";
import View from "./View";
import Title from "../Title";

import "./Home.css";

const ProjectHome = ({ match }) => {
  const projects = [
    {
      id: 20,
      title: "Gochi 2019",
      content:
        "복학 후, 팀원들과 처음으로 제작한 자바 프로젝트 부족한 실력으로 모든 변수들에 static 을 사용하여 여러 사람들을 당황하게 한 프로젝트이다.",
    },
    {
      id: 19,
      title: "kiminohanawa",
      content:
        "강의실 안에 오래 있다 보니, 실내 대기정보를 알고 싶어 진행한 프로젝트이다. 완성 후, COVID-19 로 적극 활용하지 못하여 아쉬움이 있었다.",
    },
    {
      id: 18,
      title: "SYDER",
      content:
        "배달 오토바이 사고가 증가하면서, 이를 대체하기 위한 자율주행 배달 차량을 기획했다. 비슷한 서비스를 배달외에 여러분야에서 많이 적용되고 있다.",
    },
  ];

  console.log(match.params.projectId || projects[0].id, "ddd");
  const projectId = match.params.projectId || projects[0].id;
  // const [projectId, setProjectId] = useState(
  //   match.params.projectId || projects[0].id,
  // );
  console.log(projectId, "aaa");

  return (
    <>
      <Title titleName="My Project" />
      <div className="project-home">
        <List projects={projects} projectId={projectId} />
        <View projectId={projectId} />
      </div>
    </>
  );
};

export default ProjectHome;

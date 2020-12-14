import React from "react";
import { Redirect } from "react-router-dom";
import { urls } from "../../config";
import { useAxios } from "../../hooks";
import Modal from "react-modal";

import "./RelatedProject.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    border: "none",
  },
};

const RelatedProject = ({ controller, info }) => {
  const { modalIsOpen, setModalIsOpen } = controller;
  const { stackId, title, color } = info;
  const url = urls.stack.show + `/${stackId}`;
  const { data, error } = useAxios({
    method: "get",
    url,
  });
  const relatedProjects = [];

  if (!modalIsOpen) {
    return <></>;
  }

  if (error) {
    alert("데이터 조회에 실패하였습니다.");
    return <Redirect path="/stack/*" to="/" />;
  }

  if (data && data.status === 200) {
    const { projects } = data.data;
    projects.map((item) => {
      relatedProjects.push(item);
    });
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onMouseEnterHandler = (event) => {
    event.target.style.backgroundColor = color;
  };
  const onMouseLeaveHandler = (event) => {
    event.target.style.backgroundColor = "initial";
  };
  const relatedProjectNotExists = () => {
    alert("선택하신 기술스택으로 참가한 프로젝트가 없습니다.");
    closeModal();
    return;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Related Project"
    >
      <div className="related-project">
        <div className="title" style={{ backgroundColor: color }}>
          {title}
        </div>
        <div className="projects">
          <div className="wrapper">
            {relatedProjects.length === 0
              ? relatedProjectNotExists()
              : relatedProjects.map((element) => {
                  return (
                    <div
                      key={element.id}
                      className="project"
                      onMouseEnter={onMouseEnterHandler}
                      onMouseLeave={onMouseLeaveHandler}
                    >
                      {element.title}
                    </div>
                  );
                })}
            {}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RelatedProject;

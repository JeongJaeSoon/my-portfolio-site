import React from "react";
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
  const { dataKey, title, color } = info;
  // TODO 프로젝트 정보 가져오는것 만들기
  const projects = [
    { id: 1, title: "test1" },
    { id: 2, title: "test2" },
    { id: 3, title: "test4" },
    { id: 4, title: "test5" },
    { id: 5, title: "test6" },
    { id: 6, title: "test1" },
    { id: 7, title: "test2" },
    { id: 8, title: "test4" },
    { id: 9, title: "test5" },
    { id: 10, title: "test6" },
  ];
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onMouseEnterHandler = (event) => {
    event.target.style.backgroundColor = color;
  };
  const onMouseLeaveHandler = (event) => {
    event.target.style.backgroundColor = "initial";
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
            {projects.map((element) => {
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RelatedProject;

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
  console.log(dataKey);
  const projects = [
    { id: 1, title: "test1" },
    { id: 2, title: "test2" },
    { id: 3, title: "test4" },
    { id: 5, title: "test5" },
    { id: 6, title: "test6" },
    { id: 7, title: "test1" },
    { id: 8, title: "test2" },
    { id: 9, title: "test4" },
    { id: 10, title: "test5" },
    { id: 11, title: "test6" },
  ];
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Stack Add"
    >
      <div className="related-project">
        <div className="title" style={{ backgroundColor: color }}>
          {title}
        </div>
        <div className="projects">
          <div className="wrapper">
            {projects.map((element) => {
              return (
                <>
                {/* TODO useHover 추가 */}
                  <div key={element.id} className="project">
                    {element.title}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RelatedProject;

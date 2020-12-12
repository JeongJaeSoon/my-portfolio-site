import React from "react";
import Modal from "react-modal";

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
  },
};

const RelatedProject = ({ controller, stacks, selectedStacks }) => {
  const { modalIsOpen, setModalIsOpen } = controller;

  const onChangeHandler = (event) => {
    console.log(event);
    const { id, title, value } = event.target;
    const findIndex = selectedStacks.findIndex((element) => element === title);

    findIndex === -1
      ? selectedStacks.push({ id, title, value })
      : selectedStacks.splice(findIndex, 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Stack List"
    >
      <div className="stack-list">
        <div className="title">사용 기술 스택</div>
        <ul className="stacks">
          {stacks.map((stack) => {
            return <li key={stack.id}>{stack.title}</li>;
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default RelatedProject;

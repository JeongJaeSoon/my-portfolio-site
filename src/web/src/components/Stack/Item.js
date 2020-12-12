import React, { useState } from "react";
import { useClick } from "../../hooks";
import { RequestDelete } from "../../axios";
import { RelatedProject } from "../Modal";
import { urls } from "../../config";

import "./Item.css";

const StackItem = ({ stack, dataKey }) => {
  const url = urls.stack.delete + `/${dataKey}`;
  const token = localStorage.getItem("token");
  const { title, stackImg, color, skillful, frequency } = stack;

  const onDeleteHandler = () => {
    const nextUrl = "/stack";
    const flag = window.confirm("삭제하시겠습니까?");
    if (!flag) {
      return;
    }
    RequestDelete({ url, nextUrl });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openBtn = useClick(({ target }) => {
    if (target.classList[0] === "delete-btn") {
      return;
    }

    setModalIsOpen(true);
  }, modalIsOpen);

  return (
    <div className="item" ref={openBtn}>
      <RelatedProject
        controller={{ modalIsOpen, setModalIsOpen }}
        info={{ dataKey, title, color }}
      />
      <div className="top">
        {token ? (
          <div className="delete-btn" onClick={onDeleteHandler}>
            &#10005;
          </div>
        ) : (
          ""
        )}

        <div
          className="img"
          style={{
            background: `url(${stackImg}) center no-repeat`,
            backgroundSize: "contain",
          }}
        ></div>
        <div className="value">
          <div className="skillful" style={{ color }}>
            {skillful}
          </div>
          <div className="progress-background">
            <div
              className="progress-bar"
              style={{ width: `${frequency}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bottom" style={{ backgroundColor: color }}>
        {title}
      </div>
    </div>
  );
};

export default StackItem;

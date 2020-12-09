import React from "react";
import { RequestDelete } from "../../axios";
import { urls } from "../../config";

import "./Item.css";

const StackItem = ({ stack, dataKey }) => {
  const url = urls.stack.delete + dataKey;
  const { title, stackImg, color, skillful, frequency } = stack;
  const onDeleteHandler = () => {
    const nextUrl = "/stack";
    const flag = window.confirm("삭제하시겠습니까?");
    if (!flag) {
      return;
    }
    RequestDelete({ url, nextUrl });
  };

  return (
    <div className="item">
      <div className="top">
        <div className="delete-btn" onClick={onDeleteHandler}>
          &#10005;
        </div>
        <div
          className="img"
          style={{
            background: `url(${stackImg}) center/contain no-repeat`,
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

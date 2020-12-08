import React from "react";
import "./Item.css";

const StackItem = ({ stack }) => {
  const { title, stackImg, color, skillful, frequency } = stack;
  return (
    <div className="item">
      <div className="top">
        <div className="delete-btn">&#10005;</div>
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

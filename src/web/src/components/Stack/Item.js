import React from "react";
import "./Item.css";

const StackItem = ({ stackData }) => {
  const { name, img_url, color, skillful, frequency } = stackData;
  return (
    <div className="item">
      <div className="top">
        <div className="delete-btn">&#10005;</div>
        <div
          className="img"
          style={{ background: `url(${img_url}) center/150px no-repeat` }}
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
        {name}
      </div>
    </div>
  );
};

export default StackItem;

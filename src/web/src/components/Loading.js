import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="text">로딩중입니다.</div>
    </div>
  );
};

export default Loading;

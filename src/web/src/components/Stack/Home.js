import React from "react";
import Title from "../Util/Title";
import Item from "./Item";
import Add from "./Add";
import "./Home.css";
const StackHome = () => {
  const data = [
    {
      name: "PHP",
      img_url:
        "https://blog.kakaocdn.net/dn/pVD59/btquknGhVh1/ArEncBG0uVuOvaF8TAdw31/img.jpg",
      color: "#5c7eb5",
      skillful: "최상",
      frequency: 80,
    },
    {
      name: "JAVASCRIPT",
      img_url:
        "https://media.vlpt.us/images/ansrjsdn/post/f97332df-ff0a-45ae-91d9-f4825be458e6/js.png",
      color: "#f0d91d",
      skillful: "상",
      frequency: 70,
    },
    {
      name: "REACT.JS",
      img_url:
        "https://media.vlpt.us/images/leejh9022/post/da20dd70-fd30-44ea-9f31-38aa8a56a3c6/reactjs-thumb.jpg",
      color: "#3dd9ff",
      skillful: "상",
      frequency: 85,
    },
  ];
  return (
    <>
      <Title titleName="Tech Stack" />
      <div className="stacks">
        {data.map((element) => {
          return <Item stackData={element} />;
        })}
        <Add />
      </div>
    </>
  );
};

export default StackHome;

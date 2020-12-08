import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAxios } from "../../hooks";
import { urls } from "../../config";
import Loading from "../Util/Loading";
import Title from "../Util/Title";
import Item from "./Item";
import Add from "./Add";

import "./Home.css";

const StackHome = () => {
  const url = urls.stack.index;
  const token = localStorage.getItem("token");
  const stackData = [];
  const { loading, error, data } = useAxios({
    method: "get",
    url,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    alert("데이터 조회에 실패하였습니다.");
    return <Redirect path="/project/*" to="/" />;
  }

  if (data) {
    const { stacks } = data.data;
    stacks.map((element) => stackData.push(element));
  }
  return (
    <>
      <Title titleName="Tech Stack" />
      <div className="stacks">
        {stackData.map((element) => {
          const { id } = element;
          return <Item key={id} dataKey={id} stack={element} />;
        })}
        {token ? <Add /> : ""}
      </div>
    </>
  );
};

export default StackHome;

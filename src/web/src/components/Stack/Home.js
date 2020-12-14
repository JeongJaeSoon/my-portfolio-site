import React from "react";
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

  if (stackData.length === 0) {
    token || alert("등록된 기술스택이 없습니다.");

    return (
      <>
        <Title titleName="Tech Stack" />
        <div className="stacks">{token ? <Add /> : ""}</div>
      </>
    );
  }

  return (
    <>
      <Title titleName="Tech Stack" />
      <div
        className="stack-msg"
        style={{
          fontFamily: "Noto sans, sans-serif",
          fontWeight: 300,
        }}
      >
        기술 스택을 클릭 시, 관련 프로젝트 정보를 확인 하실수 있습니다.{" "}
      </div>
      <div className="stacks">
        {stackData.map((element) => {
          const { id } = element;
          return <Item key={id} stackId={id} stack={element} />;
        })}
        {token ? <Add /> : ""}
      </div>
    </>
  );
};

export default StackHome;

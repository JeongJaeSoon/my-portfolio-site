import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { urls } from "../config";
import { useClick, useAxios } from "../hooks";
import { EditAbout } from "../components/Modal";
import "./About.css";

const About = () => {
  const value = {
    main: "",
    region: "",
    address: {
      tel: "",
      email: "",
      github: "",
    },
    career: [],
    introduce: "",
  };

  // <<-- -->>
  const token = localStorage.getItem("token");
  const url = urls.about.index;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const editBtn = useClick(() => {
    setModalIsOpen(true);
  }, modalIsOpen);

  const { data, error } = useAxios({
    method: "get",
    url,
  });

  if (error) {
    alert("데이터 조회에 실패하였습니다.");
    return <Redirect path="/about/*" to="/" />;
  }

  if (data && data.status === 200) {
    const { about, career } = data.data;
    value.main = about.main;
    value.region = about.region;
    value.address.tel = about.tel;
    value.address.email = about.email;
    value.address.github = about.github;
    value.career = career;
    value.introduce = about.introduce;
  }

  const {
    main,
    region,
    address: { tel, email, github },
    career,
    introduce,
  } = value;

  return (
    <div className="about">
      <div className="header">
        <div className="profile-img" />
        {token ? (
          <div className="profile-edit" ref={editBtn}>
            Edit
          </div>
        ) : (
          ""
        )}

        <EditAbout controller={{ modalIsOpen, setModalIsOpen }} />
        <div className="profile-value">
          <div className="left">
            <div className="main-txt">{main}</div>
            <div className="txt">개발자</div>
            <div className="name-txt">
              <span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/JeongJaeSoon"
                  className="url"
                  style={{ color: "inherit" }}
                >
                  정재순
                </a>
              </span>
              <span>입니다.</span>
            </div>
          </div>
          <div className="right">
            <div className="birth">
              <p>1994년 10월 06일</p>
            </div>
            <div className="region">
              <p>{region}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="address-wrapper">
          <div className="profile-title">연락처</div>
          <ul>
            <li>
              <div className="title">TEL</div>
              <div className="value">{tel}</div>
            </li>
            <li>
              <div className="title">EMAIL</div>
              <div className="value">{email}</div>
            </li>
            <li>
              <div className="title">GITHUB</div>
              <div className="value">
                <a target="_blank" rel="noreferrer" href={github}>
                  {github}
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="career-wrapper">
          <div className="profile-title">
            경력사항
            {token ? <div className="career-add-btn">&#43;</div> : ""}
          </div>
          <ul className="careers">
            {career.map((element, index) => {
              return (
                <li key={index}>
                  <div className="title career-title">{element.date}</div>
                  <div className="value career-value">{element.value}</div>
                  {token ? <div className="career-del-btn">&#10005;</div> : ""}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="introduce-wrapper">
          <div className="profile-title">자기소개</div>
          <div className="introduce">{introduce}</div>
          <button className="img-btn">활동 사진 보기</button>
        </div>
      </div>
    </div>
  );
};

export default About;

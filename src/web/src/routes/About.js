import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { urls } from "../config";
import { useClick, useAxios } from "../hooks";
import { EditAbout, CareerCreate } from "../components/Modal";
import "./About.css";
import { RequestDelete } from "../axios";

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

  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);
  const [careerModalIsOpen, setCareerModalIsOpen] = useState(false);

  const editBtn = useClick(() => {
    setAboutModalIsOpen(true);
  }, aboutModalIsOpen);
  const addBtn = useClick(() => {
    setCareerModalIsOpen(true);
  }, careerModalIsOpen);

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

  const onDeleteHandler = ({ target }) => {
    console.log(target.parentNode.value);

    const nextUrl = "/about";
    const flag = window.confirm("삭제하시겠습니까?");
    if (!flag) {
      return;
    }
    RequestDelete({ url: urls.about.delete, nextUrl });
  };

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

        <EditAbout
          controller={{
            modalIsOpen: aboutModalIsOpen,
            setModalIsOpen: setAboutModalIsOpen,
          }}
        />
        <CareerCreate
          controller={{
            modalIsOpen: careerModalIsOpen,
            setModalIsOpen: setCareerModalIsOpen,
          }}
        />
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
          <div className="profile-title" ref={addBtn}>
            경력사항
            {token ? <div className="career-add-btn">&#43;</div> : ""}
          </div>
          <ul className="careers">
            {career.map((element) => {
              return (
                <li key={element.id} value={element.id}>
                  <div className="title career-title">{element.date}</div>
                  <div className="value career-value">{element.value}</div>
                  {token ? (
                    <div className="career-del-btn" onClick={onDeleteHandler}>
                      &#10005;
                    </div>
                  ) : (
                    ""
                  )}
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

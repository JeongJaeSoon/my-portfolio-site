import React from "react";
import "./About.css";

const About = () => {
  const {
    main,
    region,
    address: { tel, email, github },
    career,
    introduce,
  } = {
    main: "성장하는",
    region: "DAEGU",
    address: {
      tel: "010-7188-9494",
      email: "wjdwotns1006@gmail.com",
      github: "https://github.com/JeongJaeSoon",
    },
    career: [
      { date: "2013.02", value: "경원고등학교 졸업" },
      { date: "2013.03", value: "영진전문대학교 입학" },
      { date: "2015.07", value: "육군 하사 임관" },
      { date: "2019.07", value: "육군 예비역 중사 전역" },
    ],
    introduce:
      "안녕하세요! 영진전문대학교 컴퓨터 정보계열에서 공부 중인 정재순입니다. 제 블로그에 방문해 주셔서 감사합니다. 앞으로 성장하는 개발자가 될 수 있도록 하겠습니다.",
  };
  return (
    <div className="about">
      <div className="header">
        <div className="profile-img" />
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
          <div className="profile-title">경력사항</div>
          <ul>
            {career.map((element, index) => {
              return (
                <li key={index}>
                  <div className="title">{element.date}</div>
                  <div className="value">{element.value}</div>
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

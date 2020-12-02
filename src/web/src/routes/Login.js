import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useInput } from "../hooks";
import "./Login.css";

const loginURL = "http://laravel.test/api/login";

const Login = ({ history }) => {
  // TODO
  const id = useInput("wjdwotns1006@gmail.com");
  const password = useInput("1541call");

  const onLoginHandler = () => {
    if (id.value && password.value) {
      if (password.value.length < 6) {
        alert("비밀번호는 최소 6자리 이상입니다.");
        return;
      }
      axios({
        method: "post",
        url: loginURL,
        data: {
          email: id.value,
          password: password.value,
        },
      })
        .then((data) => {
          const { message, token } = data.data;
          alert(message);
          localStorage.setItem("token", token);
          window.location.replace("/");
        })
        .catch((error) => {
          if (error.response) {
            const {
              status,
              data: { message },
            } = error.response;

            return status === 401
              ? alert(message)
              : status === 422
              ? alert("잘못된 로그인 정보입니다.")
              : "";
          }
          alert("로그인에 실패하였습니다.");
          history.push("/");
          return;
        });
    }

    return id.value === ""
      ? alert("이메일 주소를 입력해주세요.")
      : password.value === ""
      ? alert("비밀번호를 입력해 주세요")
      : "";
  };
  return (
    <div className="login">
      <div className="left">
        <div className="wrapper">
          <div className="title">LOGIN</div>
          <div>
            <div className="id">
              <input type="text" placeholder="이메일" {...id} />
              <i className="fas fa-user" />
            </div>
            <div className="password">
              <input type="password" placeholder="비밀번호" {...password} />
              <i className="fas fa-lock"></i>
            </div>
            <Link to="/">비밀번호를 잊으셨나요?</Link>
            <button className="login-btn" onClick={onLoginHandler}>
              로그인
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <div className="title">Hello, Guest!</div>
          <div className="content">
            <p>안녕하세요! 영진전문대학교 </p>
            <p>컴퓨터 정보 계열 “정재순” 입니다.</p>
            <p>&nbsp;</p>
            <p>제 포트폴리오 사이트에 방문하신 것을 환영합니다.</p>
            <p>이 페이지는 React.js 와 laravel 로 제작되었습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

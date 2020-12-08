import axios from "axios";
import { urls } from "../config";

const LoginRequest = ({ email, password, history }) => {
  const url = urls.login;
  axios({
    method: "post",
    url,
    data: {
      email,
      password,
    },
  })
    .then((data) => {
      const { message, token } = data.data;
      alert(message);
      localStorage.setItem("token", token);
      history.push("/");
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
          : status === 500
          ? alert("서버로부터 응답이 올바르지 않습니다.")
          : alert("로그인에 실패하였습니다.");
      }
      history.push("/");
      return;
    });
};

export default LoginRequest;

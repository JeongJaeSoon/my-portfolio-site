import axios from "axios";

const url = "http://laravel.test/api/login";

const LoginRequest = ({ email, password, history }) => {
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
          : "";
      }
      alert("로그인에 실패하였습니다.");
      history.push("/");
      return;
    });
};

export default LoginRequest;

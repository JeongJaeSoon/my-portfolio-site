import { useAuth } from "../hooks";

const authURL = "http://laravel.test/api/auth";

const Auth = () => {
  const token = localStorage.getItem("token");

  const { data, error } = useAuth(
    {
      method: "get",
      url: authURL,
    },
    token,
  );

  if (data && data.status === 200) {
    localStorage.setItem("isLogin", true);
  }

  if (error && error.response && error.response.status === 401) {
    alert("서버 인증에 실패하였습니다.");
    localStorage.removeItem("isLogin");
  }

  return localStorage.getItem("isLogin");
};

export default Auth;

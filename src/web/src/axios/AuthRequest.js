import { useAuth } from "../hooks";

const url = "http://laravel.test/api/auth";

const AuthRequest = () => {
  const token = localStorage.getItem("token");

  const { data, error } = useAuth(
    {
      method: "get",
      url,
    },
    token,
  );

  if (data && data.status === 200) {
    const { isAuth } = data.data;
    return isAuth;
  }

  if (error && error.response && error.response.status === 401) {
    const { message } = error.response.data;
    alert(message);
    localStorage.removeItem("token");
    return false;
  }

  return false;
};

export default AuthRequest;

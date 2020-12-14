import { useAuth } from "../hooks";
import { urls } from "../config";

const AuthRequest = () => {
  const url = urls.auth;
  const token = localStorage.getItem("token");
  const { data, error } = useAuth(
    {
      method: "get",
      url,
    },
    token,
  );

  if (data && data.status === 201) {
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

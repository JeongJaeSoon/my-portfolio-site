import defaultAxios from "axios";
import { urls } from "../config";

const LogoutRequest = () => {
  const url = urls.logout;
  const token = localStorage.getItem("token");
  const authAxios = defaultAxios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  authAxios({
    method: "post",
    url,
  })
    .then((data) => {
      if (data && data.status === 201) {
        const { message } = data.data;
        alert(message);
        return;
      }
    })
    .catch((error) => {
      if (error && error.response && error.response.status === 401) {
        const { message } = error.response.data;
        alert(message);
        return;
      }

      alert("서버로부터 응답이 올바르지 않습니다.");
      return;
    })
    .finally(() => {
      localStorage.removeItem("token");
      window.location.reload();
    });
};

export default LogoutRequest;

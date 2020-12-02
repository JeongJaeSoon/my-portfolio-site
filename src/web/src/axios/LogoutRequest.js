import defaultAxios from "axios";

const url = "http://laravel.test/api/logout";

const LogoutRequest = () => {
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
      if (data && data.status === 200) {
        const { message } = data.data;
        alert(message);
      }
    })
    .catch((error) => {
      console.log(error.response);
      if (error && error.response && error.response.status === 401) {
        const { message } = error.response.data;
        alert(message);
      }
    })
    .finally(() => {
      localStorage.removeItem("token");
      window.location.reload(); 
    });
};

export default LogoutRequest;

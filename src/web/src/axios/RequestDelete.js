import Axios from "axios";

const RequestDelete = ({ url, nextUrl }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const authAxios = Axios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const options = {
    method: "delete",
    url,
  };

  authAxios(options)
    .then((data) => {
      console.log(data.data);
      if (data && data.status === 200) {
        const { msg } = data.data;
        alert(msg);
        window.location.href = nextUrl;
      }
      return;
    })
    .catch((error) => {
      if (error.response) {
        const {
          status,
          data: { message },
        } = error.response;

        console.log(error.response.data);
        return status === 401
          ? alert(message)
          : alert("삭제에 실패하였습니다.");
      }
      return;
    });
  return;
};

export default RequestDelete;

import Axios from "axios";

const RequestCreate = ({ url, nextUrl, formData }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  const authAxios = Axios.create({
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
  });
  const options = {
    method: "post",
    url,
    data: formData,
  };

  authAxios(options)
    .then((data) => {
      if (data && data.status === 201) {
        const { msg } = data.data;
        alert(msg);
        window.location.href = nextUrl;
      }
      return true;
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response) {
        const {
          status,
          data: { msg },
        } = error.response;

        return status === 401
          ? alert(msg)
          : status === 422
          ? alert("이미 등록되었거나, 잘못된 값을 입력하였습니다.")
          : status === 500
          ? alert("서버로부터 응답이 올바르지 않습니다.")
          : alert("등록에 실패하였습니다.");
      }
      return false;
    });
  return false;
};

export default RequestCreate;

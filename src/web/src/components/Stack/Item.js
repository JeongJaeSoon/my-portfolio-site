import React from "react";
import Axios from "axios";
import { urls } from "../../config";

import "./Item.css";

const StackItem = ({ stack, dataKey }) => {
  const url = urls.stack.delete + dataKey;
  const token = localStorage.getItem("token");
  const { title, stackImg, color, skillful, frequency } = stack;
  const onDeleteHandler = () => {
    const flag = window.confirm("삭제하시겠습니까?");
    if (!flag) {
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
        if (data && data.status === 200) {
          const { msg } = data.data;
          alert(msg);
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          const {
            status,
            data: { message },
          } = error.response;

          return status === 401
            ? alert(message)
            : alert("삭제에 실패하였습니다.");
        }
        return;
      });
    return;
  };
  return (
    <div className="item">
      <div className="top">
        <div className="delete-btn" onClick={onDeleteHandler}>
          &#10005;
        </div>
        <div
          className="img"
          style={{
            background: `url(${stackImg}) center/contain no-repeat`,
          }}
        ></div>
        <div className="value">
          <div className="skillful" style={{ color }}>
            {skillful}
          </div>
          <div className="progress-background">
            <div
              className="progress-bar"
              style={{ width: `${frequency}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bottom" style={{ backgroundColor: color }}>
        {title}
      </div>
    </div>
  );
};

export default StackItem;

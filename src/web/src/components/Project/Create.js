import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useAuth, useInput } from "../../hooks";
import { urls } from "../../config";
import Title from "../Util/Title";

import "./Create.css";
import { RequestCreate } from "../../axios";

const ProjectCreate = () => {
  const url = urls.stack.list;
  const token = localStorage.getItem("token");
  const stacks = [];

  const title = useInput("");
  const repoUrl = useInput("");
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState("");
  const [stackIds, setStackIds] = useState([]);
  const content = useInput("", (value) => {
    return value.length < 87;
  });
  const [selectedStack, setSelectedStack] = useState([]);
  const startDate = useInput("", (date) => {
    if (!endDate.value) {
      return true;
    }
    return endDate.value > date;
  });
  const endDate = useInput("", (date) => {
    if (!startDate.value) {
      return true;
    }
    return startDate.value < date;
  });
  const role = useInput("");

  const { data, error } = useAuth(
    {
      method: "get",
      url,
    },
    token,
  );

  if (error) {
    alert(error);
  }

  if (data) {
    const { stackList } = data.data;
    stackList.map((element) => {
      stacks.push(element);
    });
  }

  const onChangeImg = async ({ target }) => {
    const file = target.files[0];
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 150,
    };
    try {
      const compressedImgFile = await imageCompression(file, options);
      setImgFile(file);
      const promise = imageCompression.getDataUrlFromFile(compressedImgFile);
      promise.then((result) => {
        setImgFileUrl(result);
      });
    } catch (error) {
      alert(error);
    }
  };
  const onAddMouseEnterHandler = (event) => {
    event.target.style.backgroundColor = event.target.style.borderColor;
    event.target.style.color = "#ffffff";
  };
  const onAddMouseLeaveHandler = (event) => {
    event.target.style.color = event.target.style.backgroundColor;
    event.target.style.backgroundColor = "initial";
  };
  const onStoreHandler = () => {
    if (
      title.value &&
      repoUrl.value &&
      imgFile &&
      content.value &&
      stackIds &&
      startDate.value &&
      endDate.value &&
      role.value
    ) {
      const flag = window.confirm("생성하시겠습니까?");
      if (!flag) {
        return;
      }
      const nextUrl = "/project";
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("repo_url", repoUrl.value);
      formData.append("img_url", imgFile);
      formData.append("content", content.value);
      stackIds.forEach((item) => {
        formData.append("stacks[]", item);
      });
      formData.append("start_date", startDate.value);
      formData.append("end_date", endDate.value);
      formData.append("role", role.value);
      RequestCreate({ url: urls.project.store, nextUrl, formData });
    } else {
      alert("모두 입력하였는지 확인해주세요.");
      return;
    }
  };
  const onAddStackHandler = (event) => {
    const item = {
      id: event.target.getAttribute("id"),
      title: event.target.getAttribute("title"),
      color: event.target.getAttribute("color"),
    };

    const found = selectedStack.find((element) => {
      return element.id === item.id;
    });

    if (found) {
      return;
    }
    setSelectedStack(selectedStack.concat(item));
    setStackIds(stackIds.concat(parseInt(item.id)));
  };
  const removeStackHandler = (event) => {
    const id = event.target.getAttribute("id");
    const tmpSeletedStack = selectedStack.filter((element) => {
      return element.id !== id;
    });

    setSelectedStack(tmpSeletedStack);
  };

  return (
    <>
      {token ? (
        <>
          <Title titleName="Create My Project" />
          <div className="project-create">
            <div className="left">
              <div className="project-title">
                <input type="text" placeholder="프로젝트 명" {...title} />
                <input
                  type="url"
                  placeholder="GitHub Repository 주소"
                  {...repoUrl}
                />
              </div>
              <div className="project-img">
                <div
                  className="img-show"
                  style={{
                    width: "180px",
                    height: "180px",
                    background: `url(${imgFileUrl}) center/180px no-repeat`,
                  }}
                ></div>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  className="img-btn"
                  onChange={onChangeImg}
                />
              </div>
              <textarea
                className="project-content"
                placeholder="프로젝트 소개글을 작성하세요"
                {...content}
              ></textarea>
            </div>
            <div className="right">
              <div className="project-sub-title">상세 정보</div>
              <ul>
                <li className="stacks">
                  <div className="title">개발 스택</div>
                  <div className="value">
                    <div className="wrapper">
                      <ul className="stack-selected">
                        {selectedStack.map((element) => {
                          return (
                            <li
                              className="stack"
                              key={element.id}
                              style={{
                                backgroundColor: element.color,
                                color: "#ffffff",
                              }}
                              id={element.id}
                              onClick={removeStackHandler}
                            >
                              {element.title}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="txt">사용 기술</div>
                    </div>
                    <div className="wrapper">
                      <ul className="stack-list">
                        {stacks.map((element) => {
                          return (
                            <li
                              className="stack"
                              key={element.id}
                              style={{
                                border: `1px solid ${element.color}`,
                                color: element.color,
                              }}
                              id={element.id}
                              title={element.title}
                              color={element.color}
                              onMouseEnter={onAddMouseEnterHandler}
                              onMouseLeave={onAddMouseLeaveHandler}
                              onClick={onAddStackHandler}
                            >
                              {element.title}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="txt">기술 목록</div>
                    </div>
                  </div>
                </li>
                <li className="date">
                  <div className="title">개발 기간</div>
                  <div className="value">
                    <input type="date" className="start-date" {...startDate} />
                    <p>~</p>
                    <input type="date" className="end-date" {...endDate} />
                  </div>
                </li>
                <li className="role">
                  <div className="title">담당 역할</div>
                  <div className="value">
                    <input
                      type="text"
                      placeholder="21자 이내로 작성하세요."
                      maxLength="21"
                      {...role}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <button className="create-btn" onClick={onStoreHandler}>
            저장
          </button>
        </>
      ) : (
        <Redirect path="*" to="/project" />
      )}
    </>
  );
};

export default ProjectCreate;

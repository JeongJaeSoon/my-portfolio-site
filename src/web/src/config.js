// const baseURL = "http://localhost:8888/api";
const baseURL = "http://www.94soon.net/api";

const urls = {
  auth: `${baseURL}/auth`,
  login: `${baseURL}/login`,
  logout: `${baseURL}/logout`,
  project: {
    index: `${baseURL}/project`,
    show: `${baseURL}/project`,
    store: `${baseURL}/project`,
  },
  stack: {
    index: `${baseURL}/stack`,
    show: `${baseURL}/stack`,
    list: `${baseURL}/stack/list`,
    store: `${baseURL}/stack`,
    delete: `${baseURL}/stack`,
  },
  about: {
    index: `${baseURL}/about`,
    store: `${baseURL}/about`,
    delete: `${baseURL}/about`,
  },
  career: {
    store: `${baseURL}/career`,
  },
};

export { urls };

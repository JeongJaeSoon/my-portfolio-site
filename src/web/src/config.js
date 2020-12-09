const baseURL = "http://localhost/api";
const urls = {
  auth: `${baseURL}/auth`,
  login: `${baseURL}/login`,
  logout: `${baseURL}/logout`,
  project: {
    index: `${baseURL}/project`,
    show: `${baseURL}/project/`,
  },
  stack: {
    index: `${baseURL}/stack`,
    store: `${baseURL}/stack`,
    delete: `${baseURL}/stack/`,
  },
};

export { urls };

// const baseURL = "http://laravel.test/api";
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
};

export { urls };

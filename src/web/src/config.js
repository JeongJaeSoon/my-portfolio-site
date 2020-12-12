const baseURL = "http://laravel.test/api";
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
    list: `${baseURL}/stack/list`,
    store: `${baseURL}/stack`,
    delete: `${baseURL}/stack`,
  },
};

export { urls };

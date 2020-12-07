const baseURL = "http://laravel.test/api";
const urls = {
  auth: `${baseURL}/auth`,
  login: `${baseURL}/login`,
  logout: `${baseURL}/logout`,
  project: {
    index: `${baseURL}/project`,
    show: `${baseURL}/project/`,
  },
};

export { urls };

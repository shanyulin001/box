import Axios from 'axios';
import qs from 'qs';
import Router from '../router';
import Config from '../config';

Axios.defaults.baseURL = `${Config.httpPrefix}/api`;
Axios.defaults.transformRequest = data => qs.stringify(data);

Axios.interceptors.request.use(
  (config) => {
    const lang = localStorage.locale || (navigator.browserLanguage || navigator.language).toLowerCase() || 'zh-cn';
    config.headers['Accept-Language'] = `${lang};`;
    let val;
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {};
      }
      val = config.params;
    } else {
      if (!config.data) {
        config.data = {};
      }
      val = config.data;
    }
    val.token = localStorage.token;
    val.timestamp = new Date() * 1;
    return config;
  },
  error => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => {
    response.data.code = response.data.code.toString();
    if (response.data.code === '9004' || response.data.code === '9005') {
      Router.app.logout();
    }
    if (response.data.code === '1') {
      return response.data;
    }
    Router.app.$toast(response.data.msg);
    return Promise.reject(response.data);
  },
  error => Promise.reject(error),
);
export default Axios;

import axios from 'axios';
import * as interceptors from './interceptors';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function getAxiosInstance(options) {
  const instance = axios.create();
  interceptors.install(instance, options);
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return instance;
}

function makeGet() {
  return getAxiosInstance().get;
}


function makePost() {
  return getAxiosInstance().post;
}


export default {
  get: makeGet(),
  post: makePost(),
};

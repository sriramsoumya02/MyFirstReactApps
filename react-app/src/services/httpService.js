import axios from 'axios';
import logger from './loggerService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, function (error) {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    console.log('logging', error);
    alert('An unexpected error occured');
  }
  return Promise.reject(error);
});
export function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

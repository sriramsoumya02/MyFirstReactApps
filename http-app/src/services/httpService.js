import axios from 'axios';
// import { toast } from 'react-toastify';
axios.interceptors.response.use(null, (error) => {
  console.log('this is from interceptors');
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log('logging error', error);
    alert('An unexpected error occured');
    // toast('An unexpected error occured');
    // toast.error('this is toast error');
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.post,
  delete: axios.delete,
};

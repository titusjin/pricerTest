import axios from 'axios';
import Store from '../store';
// import { nanoid } from '@reduxjs/toolkit';

// import { SERVER_ERROR, TOKEN_EXPIRED, API_NOT_FOUND }
//   from '@/components/MessageContainer/const';
// const { dispatch } = Store;

const API_TIMEOUT_DUR = 30000;

// axios.defaults.headers.common['X-XSRF-TOKEN'] =
//   cookieUtils.get('XSRF-TOKEN') || '';
// axios.defaults.headers.common['token'] =
//   cookieUtils.get('token') || '';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.patch['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';

export const instance = axios.create({
  timeout: API_TIMEOUT_DUR,
  withCredentials: true,
  // TODO: Should use propertiy-like to change the url in the future
  baseURL: 'https://locallhost:3001',
});

const handle400Error = errRes => {
  let { code } = errRes;
  switch(code){
    // case API_ERROR_TOKEN_EXPIRED: // token is expired for future usage
    //   handleLogout();
    //   break;
    default:
      throw errRes; 
  }
};
const handle404Error = () => {
  console.error('API NOT FOUND');
  // dispatch({
  //   type: SET_MESSAGE,
  //   payload: {
  //     text: API_NOT_FOUND,
  //     status: 'ERROR'
  //   }
  // });
};
const handle500Error = () => {
  console.error('SERVER ERROR');
  // dispatch({
  //   type: SET_MESSAGE,
  //   payload: {
  //     text: SERVER_ERROR,
  //     status: 'ERROR'
  //   }
  // });
};

const handleNetworkError = () => {
  console.error('NETWORK WENT WORNG');
  // dispatch({
  //   type: SET_MESSAGE,
  //   payload: {
  //     text: 'Network went wrong!',
  //     status: 'ERROR'
  //   }
  // });
};

instance.interceptors.response.use(
  response => {
    // if (response.data.code === API_ERROR_BTSE_TOKEN_EXPIRED) { // token is expired
    //   handleLogout();
    // }
    return response;
  },
  error => {
    if (error.response) {
      const { status } = error.response;
      switch(status){
        case 400:
          console.log('error', status, error.response.config.url);
          handle400Error(error.response);
          break;
        case 404:
          console.log('no such api', status, error.response.config.url);
          handle404Error();
          break;
        default:
          handle500Error();
          console.log('error', status, error.response.config.url);
          break;
      }
    } else {
      handleNetworkError();
    }
    return Promise.reject(error.response);
  }
);

const api = {};

api.fire = instance.request;

api.handleError = code => {
  switch(code){
    case 400: 
      console.error('API-request parameter is mandatory');
      break;
    default:
      console.error('API-request parameter is mandatory');
  }
};

export default api;


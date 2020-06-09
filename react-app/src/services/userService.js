import http from './httpService';
import { apiBackend } from '../config.json';

const usersUrl = apiBackend + '/users';
export function saveUser(user) {
  return http.post(usersUrl, {
    email: user.userName,
    password: user.password,
    name: user.name,
  });
}

export default {
  saveUser: saveUser,
};

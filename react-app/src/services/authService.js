import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../config.json';

const authUrl = config.apiBackend + '/auth';
const tokenKey = 'token';
http.setJwt(getJwt());
export async function login(email, password) {
  const { data: token } = await http.post(authUrl, { email, password });
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
};

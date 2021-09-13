export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const UID_KEY = 'UID_KEY';
export const getUid = () => localStorage.getItem(UID_KEY);
export const API = 'https://api.weibo.devin.red';

export const APP_KEY = '3696852244';
export const APP_SECRET = '52eaa55c068e880f58b81cab494f819e';
export const REDIRECT_URI = encodeURIComponent(`${window.location.origin}${window.location.pathname}/login`.replace(/\/+login/g, '/login'));
export const APP_URI = ('/' + (process.env.PUBLIC_URL || '')).replace(/\/+/, '/');

export const LOGIN_URL = `${API}/oauth2/authorize?client_id=${APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email`;

export const getAccessCode = code => `${API}/oauth2/access_token?client_id=${APP_KEY}&client_secret=${APP_SECRET}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}`;

export const COMMENT_PAGESIZE = 5;

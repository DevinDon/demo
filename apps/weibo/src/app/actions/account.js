import { message } from 'antd';
import * as api from '../api/account';
import { ACCESS_TOKEN_KEY, APP_URI, UID_KEY } from '../constants';

export function getAccess(params = {}) {
  return async () => {
    try {
      const { access_token, uid } = await api.getAccess(params);
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(UID_KEY, uid);
      await message.success('登录成功', 1.5);
    } catch (e) {
      await message.error('登录失败', 1.5);
    }
    window.location.href = APP_URI;
  };
}

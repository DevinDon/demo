import { getAccessCode } from '../constants';
import ajax from '../utils/ajax';

export function getAccess({ code }) {
  return ajax.post(getAccessCode(code));
}

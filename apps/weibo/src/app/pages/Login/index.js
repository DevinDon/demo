import queryString from 'query-string';
import { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { getAccess } from '../../actions/account';
import Loading from '../../components/Loading';

export const Login = () => {
  const dispatch = useDispatch();
  const { query: { code } } = queryString.parseUrl(window.location.href);
  useEffect(() => {
    code && dispatch(getAccess({ code }));
  }, [code, dispatch]);
  return <Loading tip="登录中，请稍候……" />;
};

export default Login;

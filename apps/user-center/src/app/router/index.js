import { Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Spin } from 'antd';
import styles from './index.module.less';
// import Registerfrom "../Pages/Home";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";

const Home = lazy(() => import('../Pages/Home'));
const Login = lazy(() => import('../Pages/Login'));
const Register= lazy(() => import('../Pages/Register'));

const Router = () => {
  return (
    <Suspense 
      fallback={
        <div className={styles.spinWrap}>
          <Spin size="large" />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Suspense>
  );
};

export default Router;

import React, { useState }  from "react";
import { Tabs, Form, Checkbox, Row } from "antd";
import { Link } from 'react-router-dom';
import { 
  UserOutlined, LockTwoTone, 
  MobileTwoTone, MailTwoTone,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons";
import { useDispatch } from 'redux-react-hook';
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import { login } from "../../actions/account.js";
import styles from "./index.module.less";

const { TabPane } = Tabs;

const Login = () => {
  const dispatch = useDispatch();
  const [autoLogin, setAutoLogin] = useState(true);
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="账号密码登录" key="1">
              <InputItem
                name="username"
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="User Name"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "please type your user name!",
                  },
                ]}
              />
              <InputItem
                name="password"
                prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
                placeholder="Password"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "please type the password!",
                  },
                ]}
                type="password"
              />
            </TabPane>
            <TabPane tab="手机号登录" key="2">
              <InputItem
                name="mobile"
                prefix={<MobileTwoTone />}
                placeholder="Phone Number"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "please type your phone number!",
                  },
                ]}
              />
              <InputItem
                name="captcha"
                prefix={<MailTwoTone />}
                placeholder="Cap tcha"
                size="large"
              />
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            >
              自动登录
            </Checkbox>
            <a href="#!">忘记密码</a>
          </Row>
          <SubmitButton>Submit</SubmitButton>
        </Form>
        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/register">
            注册账户
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

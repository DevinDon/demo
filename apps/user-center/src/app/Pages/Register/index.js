import React, { useState } from "react";
import { Form, Popover, Progress, Select, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "redux-react-hook";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import { getCaptcha, register } from "../../actions/account";
import styles from "./index.module.less";

const { Option } = Select;

const passwordStatusMap = {
  ok: <div className={styles.success}>Strong</div>,
  pass: <div className={styles.warning}>Medium</div>,
  poor: <div className={styles.error}>Weak</div>,
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false);
  const [prefix, setPrefix] = useState("86");
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    dispatch(register(values));
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("两次输入密码不匹配");
    }
    return promise.resolve();
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  const checkPassword = (_, value) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject("请输入密码");
    }
    setPopover(!popover);
    if (!visible) {
      setVisible(!!value);
    }
    if (value && form.getFieldValue("confirm")) {
      form.validateFields(["confirm"]);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();

    return (
      value &&
      value.length && (
        <div className={styles[`progress-${passwordStatus}`]}>
          <Progress
            className={styles.progress}
            status={passwordProgressMap[passwordStatus]}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
          />
        </div>
      )
    );
  };

  const handleClickCaptcha = () => {
    Promise.all([
      form.validateFields(["email", "username"]),
      checkConfirm("", form.getFieldValue("confirm")),
    ])
      .then(() =>
        dispatch(
          getCaptcha(form.getFieldsValue(["username", "email", "password"]))
        )
      )
      .catch(console.log);
  };

  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.register}>
          <Form form={form} onFinish={handleFinish}>
            <InputItem
              name="username"
              placeholder="用户名"
              size="large"
              rules={[
                {
                  required: true,
                  message: "please type your user name!",
                },
              ]}
            />
            <InputItem
              name="email"
              placeholder="邮箱"
              size="large"
              rules={[
                {
                  required: true,
                  message: "please type your E-maill address!",
                },
                {
                  type: "email",
                  message: "please type the valid E-mail!",
                },
              ]}
            />
            <Popover
              content={
                visible && (
                  <div>
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div>请至少输入6个字符，请不要使用容易被猜到的密码。</div>
                  </div>
                )
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              <InputItem
                name="password"
                placeholder="至少6位密码，区分大小写"
                size="large"
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
                type="password"
              />
            </Popover>
            <InputItem
              name="confirm"
              placeholder="确认密码"
              size="large"
              rules={[
                {
                  required: true,
                  message: "please comfirm the password!",
                },
                {
                  validator: checkConfirm,
                },
              ]}
              type="password"
            />
            <Row>
              <Col span={6}>
                <Select
                  size="large"
                  value={prefix}
                  onChange={(value) => setPrefix(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="86">+86</Option>
                  <Option value="1">+1</Option>
                </Select>
              </Col>
              <Col span={18}>
                <InputItem
                  name="mobile"
                  placeholder="phone number"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "please input your phone number",
                    },
                    {
                      pattern: /^\d{11}$/,
                      message: "Invalid phone number! ",
                    },
                  ]}
                  type="password"
                />
              </Col>
            </Row>
            <InputItem
              name="captcha"
              size="large"
              rules={[
                {
                  required: true,
                  message: "Please type the V code",
                },
              ]}
              placeholder="验证码"
              onClick={handleClickCaptcha}
            />
            <Row justify="space-between" align="middle">
              <Col span={8}>
                <SubmitButton>注册</SubmitButton>
              </Col>
              <Col span={16}>
                <Link className={styles.login} to="/login">
                  使用已有账户登录
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

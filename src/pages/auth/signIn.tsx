import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, Typography } from "antd";

import "./style.scss";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    style: { marginBottom: "0.5rem" },
  };

  const changeMailHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const redirectToSignUp = () => navigate("/sign-up");

  const onSubmit = (values: any) => {
    console.log("values", values);
  };

  return (
    <Card className="auth-form-container">
      <div className="form-title">
        <Typography.Title level={2}>Sign In</Typography.Title>
      </div>
      <Form
        className="auth-form"
        name="sign-in-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          {...formItemLayout}
        >
          <Input value={email} onChange={changeMailHandler} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          {...formItemLayout}
        >
          <Input
            type="password"
            value={password}
            onChange={changePasswordHandler}
          />
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button className="submit-button" type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: "1rem 0 0.2rem 0" }} />
      <div className="form-footer">
        Don't have an account?
        <Button type="link" onClick={redirectToSignUp}>
          Sign Up
        </Button>
      </div>
    </Card>
  );
};

export default SignIn;

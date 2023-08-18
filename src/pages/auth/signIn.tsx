import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import Loader from "../../components/ui/loader/loader";

import authService from "../../services/auth";
import { LoadingContext } from "../../context/loading.context";
import { UserContext } from "../../context/user.context";

import "./style.scss";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, setLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    style: { marginBottom: "0.5rem" },
  };

  const login = async () => {
    const { user } = await authService.getUser();
    setUser(user);
  };

  const changeMailHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const redirectToSignUp = () => navigate("/sign-up");

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { token } = await authService.signIn(values);
      localStorage.setItem("uid", token);

      login();
      navigate("/");

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Card className="auth-form-container">
      {isLoading ? <Loader /> : null}
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

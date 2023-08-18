import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { LoadingContext } from "../../context/loading.context";
import Loader from "../../components/ui/loader/loader";
import authService from "../../services/auth";
import { UserContext } from "../../context/user.context";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { isLoading, setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (value: string) => void
  ) => {
    cb(e.target.value);
  };

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    style: { marginBottom: "0.5rem" },
  };

  const redirectToSignIn = () => navigate("/sign-in");

  const checkPasswordConfirmation = (password: string, confirmation: string) =>
    password === confirmation;

  const onSubmit = async (values: any) => {
    const passwordIsConfirmed = checkPasswordConfirmation(
      values.password,
      values.passwordConfirmation
    );
    if (passwordIsConfirmed) {
      setLoading(true);
      try {
        await authService.signUp(values);
        navigate("/sign-in");
      } catch (e) {
        setLoading(false);
      }

      setLoading(false);
    }
  };
  return (
    <Card className="auth-form-container">
      {isLoading ? <Loader /> : null}
      <div className="form-title">
        <Typography.Title level={2}>Sign Up</Typography.Title>
      </div>
      <Form
        className="auth-form"
        name="sign-up-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <div className="auth-form__form-row">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            {...formItemLayout}
          >
            <Input
              value={firstName}
              onChange={(e) => onChangeHandler(e, setFirstName)}
            />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" {...formItemLayout}>
            <Input
              value={lastName}
              onChange={(e) => onChangeHandler(e, setLastName)}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
          {...formItemLayout}
        >
          <Input value={email} onChange={(e) => onChangeHandler(e, setEmail)} />
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
            onChange={(e) => onChangeHandler(e, setPassword)}
          />
        </Form.Item>

        <Form.Item
          label="Password Confirmation"
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: "Please input your password confirmation!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          {...formItemLayout}
        >
          <Input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => onChangeHandler(e, setPasswordConfirmation)}
          />
        </Form.Item>

        <Form.Item {...formItemLayout}>
          <Button className="submit-button" type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: "1rem 0 0.2rem 0" }} />
      <div className="form-footer">
        Already have an account?
        <Button type="link" onClick={redirectToSignIn}>
          Sign In
        </Button>
      </div>
    </Card>
  );
};

export default SignUp;

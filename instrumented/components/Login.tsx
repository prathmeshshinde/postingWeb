import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { login }: any = useUserAuth();
  const navigate = useNavigate();
  const { Title } = Typography;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      await login(values.email, values.password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <div className="form-div" style={{ height: "100vh" }}>
        <div className="form-box">
          <div className="form-title">
            <Title level={3} type="secondary">
              Login
            </Title>
          </div>
          {error ? (
            <p
              style={{
                textAlign: "center",
                color: "red",
                margin: "0px 0px 10px 0px",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          ) : null}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>

              <Link to="/signup" className="style-link">
                Sign Up
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

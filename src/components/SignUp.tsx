import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const SignUp: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { Title } = Typography;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { signup }: any = useUserAuth();
  const db = getFirestore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      setError("");
      const signedUpUser = await signup(values.email, values.password);
      addDoc(collection(db, "users"), {
        username: values.username,
        userId: signedUpUser.user.uid,
        bio: "Add Bio",
        profile: "",
        docId: "",
      }).then((res) => {
        updateDoc(doc(db, "users", res.id), {
          docId: res.id,
        });
      });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <div className="form-div" style={{ height: "100vh" }}>
        <div className="sign-box" style={{ paddingBottom: "10px" }}>
          <div className="form-title">
            <Title level={3} type="secondary">
              Sign Up
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
              data-error-signup="data-error-signup"
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
                signup-input-email="signup-input-email"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                signup-input-username="signup-input-username"
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
                signup-input-pass="signup-input-pass"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                data-testid="signup-button"
              >
                Sign Up
              </Button>

              <Link to="/login" className="style-link">
                Log In
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;

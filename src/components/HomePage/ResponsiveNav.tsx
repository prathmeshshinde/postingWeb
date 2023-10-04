import React from "react";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
  ReadOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import { Dropdown, MenuProps, Space, message } from "antd";

const ResponsiveNav: React.FC = () => {
  const { signout, currUser }: any = useUserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err: any) {
      message.error("Something went wrong");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: <Link to="/like">Likes</Link>,
      icon: <HeartOutlined />,
    },
    {
      key: "3",
      label: <Link to="/bookmark">Bookmarks</Link>,
      icon: <ReadOutlined />,
    },
    {
      key: "4",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "5",
      danger: true,
      label: currUser ? (
        <p onClick={handleSignOut}>Logout</p>
      ) : (
        <Link to="/login">Login</Link>
      ),
      icon: currUser ? <LogoutOutlined /> : <LoginOutlined />,
    },
  ];

  return (
    <div className="responsive-nav-container">
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Space>
          <MenuOutlined
            className="nav-icon-main"
            style={{ fontSize: "20px", marginTop: "10px" }}
          />
        </Space>
      </Dropdown>
    </div>
  );
};

export default ResponsiveNav;

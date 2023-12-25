import React from "react";
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
  ReadOutlined,
  LogoutOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import { Dropdown, MenuProps, Space, message } from "antd";

const ResponsiveNav: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { signout }: any = useUserAuth();
  const navigate = useNavigate();
  const localStore = localStorage.getItem("userId");

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err: unknown) {
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
      label: <Link to="/myposts">My Posts</Link>,
      icon: <UsergroupAddOutlined />,
    },
    {
      key: "5",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "6",
      danger: true,
      label: localStore ? (
        <p
          onClick={handleSignOut}
          data-handle-logout="handle-logout"
          data-testid="handle-res-logout"
        >
          Logout
        </p>
      ) : (
        <Link to="/login" data-handle-logout="handle-logout">
          Login
        </Link>
      ),
      icon: localStore ? (
        <div data-testid="logout-icon">
          <LogoutOutlined />
        </div>
      ) : (
        <LoginOutlined />
      ),
    },
  ];

  return (
    <div className="responsive-nav-container">
      <Dropdown className="dropdown-menu" menu={{ items }} trigger={["click"]}>
        <Space>
          <MenuOutlined
            data-testid="menu-click"
            className="nav-icon-main"
            style={{ fontSize: "20px", marginTop: "10px" }}
          />
        </Space>
      </Dropdown>
    </div>
  );
};

export default ResponsiveNav;

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  HeartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const SideBar: React.FC<any> = () => {
  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={250}
        className="sider"
      >
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          style={{ marginTop: "30px" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">
            <Link to="/">
              <HomeOutlined className="sidebar-icon" />
              <label className="label-sidebar"> Home</label>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/like">
              <HeartOutlined className="sidebar-icon" />
              <label className="label-sidebar">Like</label>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/bookmark">
              <ReadOutlined className="sidebar-icon" />
              <label className="label-sidebar">Bookmark</label>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/profile">
              <UserOutlined className="sidebar-icon" />
              <label className="label-sidebar">Profile</label>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;

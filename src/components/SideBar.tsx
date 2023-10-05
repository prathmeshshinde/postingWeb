import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  HeartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

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
        <div>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <HomeOutlined className="sidebar-icon" />
              <label className="label-sidebar">Home</label>
            </NavLink>
            <NavLink
              to="/like"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <HeartOutlined className="sidebar-icon" />
              <label className="label-sidebar">Like</label>
            </NavLink>
            <NavLink
              to="/bookmark"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <ReadOutlined className="sidebar-icon" />
              <label className="label-sidebar">Bookmark</label>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <UserOutlined className="sidebar-icon" />
              <label className="label-sidebar">Profile</label>
            </NavLink>
          </div>
        </div>
      </Sider>
    </>
  );
};

export default SideBar;

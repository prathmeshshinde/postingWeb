import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import ResponsiveNav from "./ResponsiveNav";

const Header: React.FC = () => {
  const { signout }: any = useUserAuth();
  const navigate = useNavigate();
  const localStore = localStorage.getItem("userId");

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err: any) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="header-main">
      <div className="header">
        <div>
          <p className="logo">Posting</p>
        </div>
        <ResponsiveNav />
        <div className="button-logout">
          {localStore ? (
            <Button type="primary" onClick={handleSignOut}>
              Log out
            </Button>
          ) : (
            <Button type="primary">
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

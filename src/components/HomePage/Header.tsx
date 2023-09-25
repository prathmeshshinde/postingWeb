import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import ResponsiveNav from "./ResponsiveNav";

const Header: React.FC = () => {
  const { signout }: any = useUserAuth();
  const navigate = useNavigate();
  const { currUser }: any = useUserAuth();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="header">
      <div>
        <p className="logo">Posting</p>
      </div>
      <ResponsiveNav />
      <div className="button-logout">
        {currUser ? (
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
  );
};

export default Header;

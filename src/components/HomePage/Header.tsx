import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
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
      console.log(err.message, "header Page");
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
    // <>
    //   <Menu className="header" style={{ display: "flex", justifyContent: "space-between" }}>
    //     <Menu.Item key="1">
    //       <Link to="/">
    //         <p className="logo">Posting</p>
    //       </Link>
    //     </Menu.Item>
    //     <Menu.Item key="2" style={{ textAlign: "end" }}>
    //       <ResponsiveNav />
    //       <div className="button-logout">
    //         {currUser ? (
    //           <Button type="primary" onClick={handleSignOut}>
    //             Log out
    //           </Button>
    //         ) : (
    //           <Button type="primary">
    //             <Link to="/login">Log In</Link>
    //           </Button>
    //         )}
    //       </div>
    //     </Menu.Item>
    //   </Menu>
    // </>
  );
};

export default Header;

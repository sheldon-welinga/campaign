import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logOut, userCredentials, token } = useContext(AppContext);

  const handleLogOut = () => {
    logOut?.();
    navigate("/logout");
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="header">
      <div>
        <Link to="/dashboard" className="nav-item">
          Home
        </Link>
        <Link to="/about-us" className="nav-item">
          About Us
        </Link>
        <Link to="/posts" className="nav-item">
          Posts
        </Link>
        <Link to="/partners" className="nav-item">
          Partners
        </Link>
      </div>
      <div className="nav-item-right">
        {userCredentials && (
          <button className="btn btn-outline">{userCredentials.name}</button>
        )}
        <button className="btn btn-outline" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Header;

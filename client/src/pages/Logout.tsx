import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return (
    <div className="logout bg-orange">
      <div className="wrapper">
        <h1>You have been successfully logged out</h1>
        <Link to="/login" className="btn btn-primary">
          Log Back in
        </Link>
      </div>
    </div>
  );
};

export default Logout;

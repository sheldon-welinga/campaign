import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <div className="dashboard bg-orange">
      <div className="wrapper">
        <div className="image">
          <img src="/images/world.jpeg" alt="world" />
        </div>
        <div className="content">
          <h1>"With awareness come responsibility and choice"</h1>
          <Link to="/posts" className="btn btn-purple">
            Raise a cause
          </Link>
        </div>
      </div>
      <div className="wrapper">
        <div className="content">
          <h1>"When you support a small business, you support a dream"</h1>
          <Link to="/about-us" className="btn btn-purple">
            Learn more
          </Link>
        </div>
        <div className="image">
          <img src="/images/laptop.jpeg" alt="laptop and person" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

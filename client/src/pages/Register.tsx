import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AppContext } from "../context";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerUser, token } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [registerValues, setRegisterValues] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const { confirmPassword, ...restValues } = registerValues;

      if (registerValues.password !== confirmPassword) {
        throw Error(`Password do not match!`);
      }

      await registerUser?.(restValues);

      if (token) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      enqueueSnackbar(err.message, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  return (
    <div className="account bg-orange">
      <div className="wrapper">
        <div className="account-header">
          <h1 className="title">Create new Account</h1>
          <p>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="element">
              <p className="title">Name</p>
              <input
                type="text"
                placeholder="Full name"
                id="name"
                name="name"
                className="form-control"
                value={registerValues.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="element">
              <p className="title">Email</p>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="email"
                className="form-control"
                value={registerValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="element">
              <p className="title">Password</p>
              <input
                type="password"
                placeholder="********"
                id="password"
                name="password"
                className="form-control"
                value={registerValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="element">
              <p className="title">Confirm Password</p>
              <input
                type="password"
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={registerValues.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="element btn-wrapper">
              <button className="btn btn-primary">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";

type LoginProps = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser, token } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();
  const [loginValues, setLoginValues] = useState<LoginProps>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      await loginUser?.(loginValues);

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
          <h1 className="title">Login</h1>
          <p>Signin to continue</p>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="element">
              <p className="title">Email</p>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                name="email"
                className="form-control"
                value={loginValues.email}
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
                value={loginValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="element btn-wrapper">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../context/alert/alertContext";
import AuthState from "../context/auth/authContext";
const Login = props => {
  const authContext = useContext(AuthState);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { login, isAuthenticated, error, clearErros } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert("Invalid Credentials", "danger");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, error, props.history]);
  const { email, password } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("fill all the fill", "danger");
    }

    login({
      email,
      password
    });

    //registerUser(user)
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary"> Login</span>
      </h1>
      <form className="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input type="email" name="email" value={email} onChange={onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Loading } from "./Loading";

export const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  console.log("PROPS", props);

  const handleSubmit = (e) => {
    console.log("handling");
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://wip-api.herokuapp.com/api/auth/login", state)
      .then((res) => {
        console.log(res);
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        props.history.push("/dashboard");
      });
  };

  const handleChanges = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div id="login">
      <h1>Login</h1>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <label for="info" class="label">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChanges}
          />
          <label for="info" class="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChanges}
          />
          <button>Go</button>
        </form>
      )}
    </div>
  );
};

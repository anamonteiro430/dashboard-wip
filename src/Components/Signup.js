import React, { useState } from "react";
import axios from "axios";

export const Signup = (props) => {
  const [state, setState] = useState({
    name: "ana",
    email: "asasa",
    password: "asas",
  });

  const handleSubmit = (state) => {
    console.log("token", localStorage.getItem("token"));
    console.log("stateee", state);
    axios
      .post("https://wip-api.herokuapp.com/api/auth/register", state)
      .then((res) => {
        console.log(res);
        props.history.push("/");
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  };

  const handleChanges = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(state)}>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChanges}
        />
        <label>Email</label>

        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChanges}
        />
        <label>Password</label>

        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChanges}
        />

        <button type="submit">sUBMIT</button>
      </form>
    </>
  );
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import { Background } from "./Background";
import { Random } from "./Random";
import { Nav } from "./Nav";

export const Dashboard = () => {
  const [state, setState] = useState({
    file: null,
    url: null,
    updatedurl: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://wip-api.herokuapp.com/api/background")
      .then((res) => {
        const newImg = res.data[0].url;
        setState({
          ...state,
          url: newImg,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.url]);

  return (
    <>
      <div id="home">
        <div id="background">
          <Background state={state} setState={setState} />
        </div>
      </div>
      <form></form>
    </>
  );
};

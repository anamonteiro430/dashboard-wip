import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.svg";
export const Nav = (props) => {
  console.log("PROPS FROM NAV", props);
  const [unreadMessages, setUnreadMessages] = useState([]);

  /*   useEffect(() => {
    function filter_dates(event) {
      return event.name == "admin";
    }

    setUnreadMessages(props.messages.filter(filter_dates));
  }, []); */

  const signout = () => {
    console.log("signing out");
    localStorage.removeItem("token");
  };

  /*  console.log("props.messages", props.messages);
  console.log("unreadMessages", unreadMessages); */

  return (
    <>
      <nav id="nav">
        <div className="logo">
          <Link to={`/`} className="logo-link">
            <img src={logo} width="250" />
          </Link>
        </div>
      </nav>
      <div className="menu-links">
        <div>
          <Link to={`/dashboard`}>Início</Link>
          <Link to={`/food`}>Restauração</Link>
          <Link to={`/stay`}>Estadia</Link>
          <Link to={`/visit`}>A Visitar</Link>
          <Link to={`/nightlife`}>À Noite</Link>
          <Link to={`/activities`}>Actividades</Link>
          <Link to={`/stores`}>Lojas</Link>
        </div>
        <div>
          <Link to={`/random`}>Randomizer</Link>

          <Link to={`/messages`}>Mensagens</Link>
          <Link onClick={signout}>Sair</Link>
        </div>
      </div>
    </>
  );
};

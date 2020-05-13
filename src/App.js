import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Dashboard } from "./Components/Dashboard";
import Protected from "./utils/Protected";
import { Food } from "./Components/Food";
import { Stay } from "./Components/Stay";
import { Visit } from "./Components/Visit";
import { Nightlife } from "./Components/Nightlife";
import { Activities } from "./Components/Activities";
import { Stores } from "./Components/Stores";
import { Random } from "./Components/Random";
import { Messages } from "./Components/Messages";
import { Nav } from "./Components/Nav";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);

  /*  //getting all messages
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => {
        setMessages(res.data);
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  }, []);

  console.log("messages", messages); */

  return (
    <div className="App">
      <Route>
        <Nav messages={messages} setMessages={setMessages} />
      </Route>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Protected path="/dashboard" component={Dashboard} />
      <Protected path="/food" component={Food} />
      <Protected path="/stay" component={Stay} />
      <Protected path="/visit" component={Visit} />
      <Protected path="/nightlife" component={Nightlife} />
      <Protected path="/activities" component={Activities} />
      <Protected path="/messages" component={Messages} />
      <Protected path="/stores" component={Stores} />
      <Protected path="/random" component={Random} />
    </div>
  );
}

export default App;

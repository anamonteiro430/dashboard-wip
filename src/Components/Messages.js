import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import Modal from "react-modal";
import { MessagesCard } from "./MessagesCard";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState([]);

  useEffect(() => {
    console.log("sssssss");
    Modal.setAppElement("body");
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => {
        console.log(res);
        setUnread(res.data.filter((f) => f.read == 0));

        console.log("THIS IS UNREAD", unread);
        setMessages(res.data);
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  }, []);

  return (
    <div id="page">
      <div id="content">
        <div>
          <h1>My Messages({unread.length})</h1>
        </div>

        <div id="messages-cards">
          {messages.map((messages) => (
            <MessagesCard
              messages={messages}
              setMessages={setMessages}
              unread={unread}
              setUnread={setUnread}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

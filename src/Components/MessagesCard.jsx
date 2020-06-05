import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";

export const MessagesCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    id: props.messages.id,
    name: props.messages.name,
    email: props.messages.email,
    subject: props.messages.subject,
    message: props.messages.message,
  });
  console.log("PROPS", props);

  const ModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      transition: "ease-in-out",
      overflowY: "scroll",
    },
    content: {
      backgroundColor: "white",
      top: "5%",
      marginBottom: "50px",
      height: "auto",
    },
  };
  const openMessage = () => {
    const id = state.id;
    console.log("updating");
    setModal(true);
    axios
      .put(`https://wip-api.herokuapp.com//api/contact/${id}`)
      .then((res) => {
        console.log("THIS IS RESSSS,", res);
      })
      .catch((err) => console.log(err));
  };

  const removeRandom = () => {
    const id = state.id;
    axios
      .delete(`https://wip-api.herokuapp.com//api/contact/${id}`)
      .then((res) => {
        props.setMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*   className={completed ? 'ss' : null}
   */
  return (
    <>
      <div className={props.messages.read == 0 ? "food-card red" : "food-card"}>
        <div class="food-name">
          <div className="title">
            <h2>{props.messages.subject}</h2>
          </div>
        </div>
        <div className={props.messages.read === 0 ? "whitee" : null}>
          <button onClick={openMessage} id="edit">
            Abrir
          </button>
        </div>
        <button
          id={props.messages.read == 0 ? "remove-white" : "remove"}
          onClick={removeRandom}
        >
          Apagar
        </button>
      </div>
      <Modal
        className="modal"
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={ModalStyle}
      >
        <div class="close">
          <button onClick={() => setModal(false)}>X</button>
        </div>

        <div className="modal-info">
          <div id="message-header">
            <h2>From: {props.messages.name}</h2>
            <h3>From: {props.messages.email}</h3>
            <h2>Subject: {props.messages.subject}</h2>
            <h2>{props.messages.message}</h2>
          </div>
        </div>
      </Modal>
    </>
  );
};

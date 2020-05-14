import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import Modal from "react-modal";
import { VisitCard } from "./VisitCard";

export const Visit = () => {
  const [state, setState] = useState({
    url: null,
    updatedurl: null,
  });
  const [file, setFile] = useState();
  const [visit, setVisit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [newVisit, setNewVisit] = useState({
    title: "",
    tag: "",
    urlToImage: "",
    address: "",
    map: "",
    info: "",
    price: "",
    website: "",
    type: "",
  });
  const random = "https://source.unsplash.com/daily";

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

  useEffect(() => {
    Modal.setAppElement("body");
    axios
      .get("http://wip-api.herokuapp.com/api/visit")
      .then((res) => {
        setVisit(res.data);
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  }, []);

  const selected = (e) => {
    const files = e.target.files[0];
    setFile(files);
    setUploaded(true);
  };

  const handleChanges = (e) => {
    setNewVisit({
      ...newVisit,
      [e.target.name]: e.target.value,
    });
  };

  const addVisit = (e) => {
    e.preventDefault();
    axios
      .post("http://wip-api.herokuapp.com/api/visit", newVisit)
      .then((res) => {
        setVisit(res.data.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("upload_preset", "ddfuuntg");
    setLoading(true);
    axios({
      method: "post",
      url: "http://wip-api.herokuapp.com/api/gallery/upload-images",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setState({
          ...state,
          updatedurl: res.data.data,
        });
        setNewVisit({
          ...newVisit,
          urlToImage: res.data.data,
        });
        setLoading(false);
        setUploaded(false);
        setSubmitted(true);
      })
      .catch(({ name, code, message, stack }) => {
        //handle error
        console.log({ name, code, message, stack });
      });
  };

  return (
    <div id="page">
      <button id="add" onClick={() => setModal(true)}>
        Adicionar Produto +
      </button>
      <div id="content">
        <div>
          <h1>A Visitar</h1>
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
          <div id="modal-content">
            <div className="unsplash">
              <p className="input-group">
                <label for="title" class="label">
                  Nome
                </label>
                <input
                  name="title"
                  value={state.title}
                  placeholder="Nome"
                  onChange={handleChanges}
                  type="text"
                  className="input"
                />
              </p>

              <p className="input-group">
                <label for="type" class="label">
                  Categoria
                </label>
                <select className="input" name="type" onChange={handleChanges}>
                  <option selected value="Places">
                    Places
                  </option>
                  <option value="Landmarks">Landmarks</option>
                  <option value="Parks">Parks</option>
                  <option value="Churches">Churches</option>
                </select>
              </p>

              {state.updatedurl ? (
                <div>
                  <img src={state.updatedurl} width="200" />
                </div>
              ) : (
                <img
                  src={random}
                  width="200"
                  alt="unsplash"
                  height="200"
                  className="unsplash-image"
                />
              )}
              <div id="buttons">
                <label for="file-upload" className="custom-file-upload">
                  <i className="fa fa-cloud-upload"></i> Escolher outra imagem
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={selected}
                  name="url"
                />

                {loading ? <Loading /> : null}

                {uploaded ? (
                  <div>
                    <button className="button" onClick={upload}>
                      Upload
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="modal-info">
              <form onSubmit={addVisit}>
                <p className="input-group">
                  <label for="address" class="label">
                    Morada
                  </label>
                  <input
                    name="address"
                    value={state.address}
                    placeholder="Rua ..."
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>

                <p className="input-group">
                  <label for="map" class="label">
                    Google Maps Link
                  </label>
                  <input
                    name="map"
                    value={state.map}
                    placeholder="Google Maps Link"
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>

                <p className="input-group">
                  <label for="tag" class="label">
                    Tags
                  </label>
                  <input
                    name="tag"
                    value={state.tag}
                    placeholder="Tags Adicionais"
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>

                <p className="input-group">
                  <label for="website" class="label">
                    Website
                  </label>
                  <input
                    name="website"
                    value={state.website}
                    placeholder="www..."
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>
                <p className="input-group">
                  <label for="price" class="label">
                    Preço
                  </label>
                  <select
                    className="input"
                    name="price"
                    onChange={handleChanges}
                  >
                    <option selected value="free">
                      Free
                    </option>
                    <option value="€">€</option>
                    <option value="€€">€€</option>
                    <option value="€€€">€€€</option>
                  </select>
                </p>

                <p className="input-group">
                  <label for="info" class="label">
                    Informações
                  </label>
                  <input
                    name="info"
                    value={state.info}
                    placeholder="Mais informações..."
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>

                <button type="submit" className="submit">
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        </Modal>

        <div id="visit-cards">
          {visit.map((visit) => (
            <VisitCard visit={visit} setVisit={setVisit} />
          ))}
        </div>
      </div>
    </div>
  );
};

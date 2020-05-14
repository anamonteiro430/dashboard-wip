import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";

export const VisitCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    id: props.visit.id,
    title: props.visit.title,
    tag: props.visit.tag,
    urlToImage: props.visit.urlToImage,
    map: props.visit.map,
    type: props.visit.type,
    address: props.visit.address,
    price: props.visit.price,
    facebook: props.visit.facebook,
    info: props.visit.info,
  });

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

  const handleChanges = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const edit = (e) => {
    e.preventDefault();
    console.log("this", state);
    const id = state.id;
    axios
      .put(`http://wip-api.herokuapp.com/api/visit/${id}`, state)
      .then((res) => {
        props.setVisit(res.data.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selected = (e) => {
    const files = e.target.files[0];
    setFile(files);
    setUploaded(true);
  };

  const removeVisit = () => {
    const id = state.id;
    axios
      .delete(`http://wip-api.herokuapp.com/api/visit/${id}`)
      .then((res) => {
        props.setVisit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upload = (e) => {
    console.log("uploading");
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
        console.log("res", res.data.data);
        setState({
          ...state,
          updatedurl: res.data.data,
        });
        setState({
          ...state,
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
    <>
      <div className="food-card">
        <div className="food-name">
          <h2>{props.visit.title}</h2>
        </div>
        <button onClick={() => setModal(true)} id="edit">
          Editar
        </button>
        <button id="remove" onClick={removeVisit}>
          Remover
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
                <option selected value={state.type}>
                  {state.type}
                </option>
                <option value="Places">Places</option>
                <option value="Landmarks">Landmarks</option>
                <option value="Parks">Parks</option>
                <option value="Churches">Churches</option>
              </select>
            </p>
            <div>
              {state.urlToImage ? (
                <img src={state.urlToImage} alt="placeholder" width="200" />
              ) : null}
            </div>

            <div id="buttons">
              {state.urlToImage ? (
                <label for="file-upload" className="custom-file-upload">
                  <i className="fa fa-cloud-upload"></i> Escolher Outra Imagem
                </label>
              ) : (
                <label for="file-upload" className="custom-file-upload-none">
                  <i className="fa fa-cloud-upload"></i> Upload Imagem
                </label>
              )}

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
            <form onSubmit={edit}>
              <p className="input-group">
                <label for="address" class="label">
                  Morada
                </label>
                <input
                  name="address"
                  value={state.address}
                  placeholder={state.address}
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
                  placeholder={state.tag}
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
                  placeholder={state.website}
                  onChange={handleChanges}
                  type="text"
                  className="input"
                />
              </p>
              <p className="input-group">
                <label for="price" class="label">
                  Preço
                </label>
                <select className="input" name="price" onChange={handleChanges}>
                  <option selected value={state.price}>
                    {state.price}
                  </option>
                  <option value="free">Free</option>
                  <option value="€">€</option>
                  <option value="€€">€€</option>
                  <option value="€€€">€€€</option>
                </select>
              </p>
              <p className="input-group">
                <label for="map" class="label">
                  Google Maps Link
                </label>
                <input
                  name="map"
                  value={state.map}
                  placeholder={state.map}
                  onChange={handleChanges}
                  type="text"
                  className="input"
                />
              </p>

              <p className="input-group">
                <label for="info" class="label">
                  Informações
                </label>
                <textarea
                  className="input"
                  onChange={handleChanges}
                  name="info"
                  placeholder={state.info}
                  value={state.info}
                ></textarea>
              </p>

              <button type="submit" className="submit">
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

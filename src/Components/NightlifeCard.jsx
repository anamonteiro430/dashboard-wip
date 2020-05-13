import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";

export const NightlifeCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    id: props.nightlife.id,
    title: props.nightlife.title,
    tag: props.nightlife.tag,
    urlToImage: props.nightlife.urlToImage,
    map: props.nightlife.map,
    info: props.nightlife.info,
    phone: props.nightlife.phone,
    price: props.nightlife.price,
    booking: props.nightlife.booking,
    stars: props.nightlife.stars,
    address: props.nightlife.address,
    type: props.nightlife.type,
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
    console.log("state", state);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const edit = (e) => {
    e.preventDefault();
    const id = state.id;
    axios
      .put(`http://localhost:5000/api/nightlife/${id}`, state)
      .then((res) => {
        props.setNightlife(res.data.data);
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

  const removeNightlife = () => {
    const id = state.id;
    axios
      .delete(`http://localhost:5000/api/nightlife/${id}`)
      .then((res) => {
        props.setNightlife(res.data.data);
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
      url: "http://localhost:5000/api/gallery/upload-images",
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
          <h2>{props.nightlife.title}</h2>
        </div>
        <button onClick={() => setModal(true)} id="edit">
          Editar
        </button>
        <button id="remove" onClick={removeNightlife}>
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
                placeholder="title"
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
                <option selected value="">
                  {state.type}
                </option>
                <option value="Bars">Bars</option>
                <option value="Wine-Bars">Wine-Bars</option>
                <option value="Dance">Dance</option>
                <option value="Chill">Chill</option>
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
                <label for="price" class="label">
                  Preço
                </label>
                <select className="input" name="price" onChange={handleChanges}>
                  <option selected value="">
                    {state.price}
                  </option>

                  <option value="€">€</option>
                  <option value="€€">€€</option>
                  <option value="€€€">€€€</option>
                </select>
              </p>

              <p className="input-group">
                <label for="Website" class="label">
                  Website Link
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
                <label for="info" class="label">
                  Informações
                </label>
                <textarea
                  name="info"
                  value={state.info}
                  placeholder={state.info}
                  onChange={handleChanges}
                  type="text"
                  className="input"
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

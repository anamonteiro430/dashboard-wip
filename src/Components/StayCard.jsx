import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";

export const StayCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    id: props.stay.id,
    title: props.stay.title,
    tag: props.stay.tag,
    urlToImage: props.stay.urlToImage,
    map: props.stay.map,
    info: props.stay.info,
    phone: props.stay.phone,
    price: props.stay.price,
    booking: props.stay.booking,
    stars: props.stay.stars,
    address: props.stay.address,
    type: props.stay.type,
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
    console.log("this", state);
    const id = state.id;
    axios
      .put(`https://wip-api.herokuapp.com/api/stay/${id}`, state)
      .then((res) => {
        console.log("yes", res.data.data);
        props.setStay(res.data.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selected = (e) => {
    const files = e.target.files[0];
    setFile(files);
    console.log("FILES?", files);
    setUploaded(true);
  };

  const removeStay = () => {
    const id = state.id;
    console.log("Im removing ", id);
    axios
      .delete(`https://wip-api.herokuapp.com/api/stay/${id}`)
      .then((res) => {
        console.log("NOW", res.data.data);
        props.setStay(res.data.data);
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
      url: "https://wip-api.herokuapp.com/api/gallery/upload-images",
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
          <div className="title">
            <h2>{props.stay.title}</h2>
          </div>

          <div className="type">
            <h3>{props.stay.type}</h3>
          </div>
        </div>
        <button onClick={() => setModal(true)} id="edit">
          Edit{" "}
        </button>
        <button id="remove" onClick={removeStay}>
          Remove
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
                <option selected value={state.type}>
                  {state.type}
                </option>
                <option value="Hotels">Hotels</option>

                <option value="Guesthouses">Guesthouses</option>
                <option value="Apartments">Apartments</option>
                <option value="Pet-Friendly">Pet-Friendly</option>
                <option value="Hostels">Hostels</option>
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
                <label for="Booking" class="label">
                  Booking Link
                </label>
                <input
                  name="booking"
                  value={state.booking}
                  placeholder={state.booking}
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
                  Price
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
                <label for="stars" class="label">
                  Estrelas
                </label>
                <select className="input" name="stars" onChange={handleChanges}>
                  <option selected value="">
                    {state.stars}
                  </option>
                  <option value="1">1</option>

                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </p>

              <p className="input-group">
                <label for="info" class="label">
                  Informações
                </label>
                <input
                  name="info"
                  value={state.info}
                  placeholder={state.info}
                  onChange={handleChanges}
                  type="text"
                  className="input"
                />
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

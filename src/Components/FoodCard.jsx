import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";

export const FoodCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    id: props.food.id,
    title: props.food.title,
    tag: props.food.tag,
    urlToImage: props.food.urlToImage,
    map: props.food.map,
    address: props.food.address,
    type: props.food.type,
    phone: props.food.phone,
    price: props.food.price,
    facebook: props.food.facebook,
    info: props.food.info,
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
      .put(`https://wip-api.herokuapp.com//api/food/${id}`, state)
      .then((res) => {
        props.setFood(res.data.data);
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

  const removeFood = () => {
    const id = state.id;
    console.log(id);
    axios
      .delete(`https://wip-api.herokuapp.com//api/food/${id}`)
      .then((res) => {
        props.setFood(res.data.data);
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
      url: "https://wip-api.herokuapp.com//api/gallery/upload-images",
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
            <h2>{props.food.title}</h2>
          </div>

          <div className="type">
            <h3>{props.food.type}</h3>
          </div>
        </div>
        <button onClick={() => setModal(true)} id="edit">
          Editar
        </button>
        <button id="remove" onClick={removeFood}>
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
                <option value="Portuguese">Portuguese</option>
                <option value="Grill">Grill</option>
                <option value="Healthy">Healthy</option>
                <option value="Fast-Food">Fast-Food</option>
                <option value="Desserts">Desserts</option>
                <option value="Caffees">Caffees</option>
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
                <label for="website" class="label">
                  Facebook or Website
                </label>
                <input
                  name="facebook"
                  value={state.facebook}
                  placeholder={state.facebook}
                  onChange={handleChanges}
                  type="text"
                  className="input"
                />
              </p>
              <p className="input-group">
                <label for="phone" class="label">
                  Telefone
                </label>
                <input
                  name="phone"
                  value={state.phone}
                  placeholder="phone"
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
                  <option value="€">€</option>
                  <option value="€€">€€</option>
                  <option value="€€€">€€€</option>
                </select>
              </p>

              <p className="input-group">
                <label for="info" class="label">
                  Informações
                </label>
                <textarea
                  name="info"
                  value={state.info}
                  placeholder="Mais informações..."
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import Modal from "react-modal";
import { FoodCard } from "./FoodCard";

export const Food = () => {
  const [state, setState] = useState({
    url: null,
    updatedurl: null,
  });
  const [file, setFile] = useState();
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [newFood, setNewFood] = useState({
    title: "",
    tag: "",
    urlToImage: "",
    address: "",
    phone: "",
    facebook: "",
    type: "",
    price: "",
    info: "",
    map: "",
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
      .get("http://wip-api.herokuapp.com/api/food")
      .then((res) => {
        setFood(res.data);
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
    setNewFood({
      ...newFood,
      [e.target.name]: e.target.value,
    });
  };

  const addFood = (e) => {
    e.preventDefault();
    axios
      .post("http://wip-api.herokuapp.com/api/food", newFood)
      .then((res) => {
        setFood(res.data.data);
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
        setNewFood({
          ...newFood,
          urlToImage: res.data.data,
        });
        setLoading(false);
        setUploaded(false);
        setSubmitted(true);
      })
      .catch(({ name, code, message, stack }) => {
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
          <h1>Restauração ({food.length})</h1>
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
                  <option selected value="Portuguese">
                    Portuguese
                  </option>
                  <option value="Grill">Grill</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Fast-Food">Fast-Food</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Caffees">Caffees</option>
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
              <form onSubmit={addFood}>
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
                    placeholder="Type of Cuisine (use '-' to separate)"
                    onChange={handleChanges}
                    type="text"
                    className="input"
                  />
                </p>

                <p className="input-group">
                  <label for="Facebook" class="label">
                    Facebook ou Website
                  </label>
                  <input
                    name="facebook"
                    value={state.facebook}
                    placeholder="https://"
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
                  <select
                    className="input"
                    name="price"
                    onChange={handleChanges}
                  >
                    <option selected value="€">
                      €
                    </option>
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
                  Adicionar Restaurante
                </button>
              </form>
            </div>
          </div>
        </Modal>

        <div id="food-cards">
          {food.map((food) => (
            <FoodCard food={food} setFood={setFood} />
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import Modal from "react-modal";
import { ActivityCard } from "./ActivityCard";

export const Activities = () => {
  const [state, setState] = useState({
    url: null,
    updatedurl: null,
  });
  const [file, setFile] = useState();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
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
      .get("http://wip-api.herokuapp.com/api/activities")
      .then((res) => {
        setActivities(res.data);
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
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const addActivity = (e) => {
    e.preventDefault();
    axios
      .post("http://wip-api.herokuapp.com/api/activities", newActivity)
      .then((res) => {
        setActivities(res.data.data);
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
        setNewActivity({
          ...newActivity,
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
        Adicionar Atividade +
      </button>
      <div id="content">
        <div>
          <h1>Atividades</h1>
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
                  <option selected value="Must-Do">
                    Must-Do
                  </option>
                  <option value="Museums">Museums</option>
                  <option value="Tours">Tours</option>
                  <option value="Music">Music</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Festivals">Festivals</option>
                  <option value="WorkShops">WorkShops</option>
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
                  <i className="fa fa-cloud-upload"></i> Change this Image
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
              <form onSubmit={addActivity}>
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
                  <textarea
                    className="input"
                    onChange={handleChanges}
                    name="info"
                    placeholder="Mais informações..."
                    value={state.info}
                  ></textarea>
                </p>

                <button type="submit" className="submit">
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        </Modal>

        <div id="activities-cards">
          {activities.map((activities) => (
            <ActivityCard
              activities={activities}
              setActivities={setActivities}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

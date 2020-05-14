import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Loading } from "./Loading";
import { Unsplash } from "./Unsplash";

export const EditFoodModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [food, setFood] = useState({
    id: props.food.id,
    title: props.food.title,
    tag: props.food.tag,
    urlToImage: props.food.urlToImage,
    map: props.food.map,
    info: props.food.info,
    phone: props.food.phone,
    price: props.food.price,
    facebook: props.food.facebook,
  });

  const ModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      transition: "ease-in-out",
    },
    content: {
      backgroundColor: "white",
      top: "5%",
      left: "30%",
      right: "30%",
      width: "37%",
      height: "500px",
      border: "2px solid #010A3C",
    },
  };

  useEffect(() => {
    const id = 1;
    Modal.setAppElement("body");
    axios
      .get(`https://wip-api.herokuapp.com/api/food/${id}`)
      .then((res) => {
        console.log("res", res);
        props.setBg(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChanges = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const selected = (e) => {
    const files = e.target.files[0];
    setFile(files);
    console.log("FILES?", files);
    setUploaded(true);
  };

  const edit = (e) => {
    e.preventDefault();
    const id = food.id;
    axios
      .put(`https://wip-api.herokuapp.com/api/food/${id}`, food)
      .then((res) => {
        console.log("yes", res.data.data);
        props.setFood(res.data.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upload = (e) => {
    console.log("uploading", food);
    console.log("FILES?", file);

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
        setFood({
          ...food,
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

  const submitIt = (e) => {
    e.preventDefault();
    if (!file) {
      alert("No image selected");
    }
    const changes = food.updatedurl;
    setLoading(true);
    const id = food.id;
    console.log("idd", id);
    axios
      .post(`https://wip-api.herokuapp.com/api/background/${id}`, {
        url: changes,
      })
      .then((res) => {
        console.log("added", res);
        const updatee = {
          ...food,
          url: changes,
        };
        setFood(updatee);
        setLoading(false);
        setSubmitted(false);
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  };

  return (
    <>
      <Modal
        className="modal"
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={ModalStyle}
      >
        <button onClick={() => setModal(false)} class="close">
          X
        </button>

        {props.updatedurl ? <img src={props.updatedurl} /> : <Unsplash />}

        <label for="file-upload" class="custom-file-upload">
          <i class="fa fa-cloud-upload"></i> Choose Image
        </label>

        <input type="file" id="file-upload" onChange={selected} name="url" />

        {loading ? <Loading /> : null}

        {uploaded ? (
          <button className="button" onClick={upload}>
            Upload
          </button>
        ) : null}
        {submitted ? (
          <button className="button" onClick={submitIt}>
            Submit
          </button>
        ) : null}

        {loading ? <Loading /> : null}

        <div className="modal-info">
          <form onSubmit={edit}>
            <input
              name="title"
              value={food.title}
              placeholder={props.food.title}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="tag"
              value={food.tag}
              placeholder={props.food.tag}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="map"
              value={food.map}
              placeholder={props.food.map}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="info"
              value={food.info}
              placeholder={props.food.info}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="phone"
              value={food.phone}
              placeholder={props.food.phone}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="price"
              value={food.price}
              placeholder={props.food.price}
              onChange={handleChanges}
              type="text"
            />
            <input
              name="facebook"
              value={food.facebook}
              placeholder={props.food.facebook}
              onChange={handleChanges}
              type="text"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

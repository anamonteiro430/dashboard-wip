import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "./Loading";

export const Background = (props) => {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  console.log("WHATT", props);
  useEffect(() => {
    axios
      .get("http://wip-api.herokuapp.com/api/background/")
      .then((res) => {
        props.setBg(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selected = (e) => {
    const files = e.target.files[0];
    props.setState({
      ...props.state,
      file: files,
    });
    setUploaded(true);
  };

  const upload = (e) => {
    console.log("uploading");
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", props.state.file);
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
        props.setState({
          ...props.state,
          updatedurl: res.data,
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
    if (!props.state.file) {
      alert("No image selected");
    }
    const changes = props.state.updatedurl;
    setLoading(true);
    axios
      .put("http://wip-api.herokuapp.com/api/background/1", {
        url: changes,
      })
      .then((res) => {
        console.log("added", res);
        const updatee = {
          ...props.state,
          url: changes,
        };
        props.setState(updatee);
        setLoading(false);
        setSubmitted(false);
      })
      .catch(({ name, code, message, stack }) => {
        console.log({ name, code, message, stack });
      });
  };

  return (
    <div id="background-page">
      <div className="tiles">
        <div className="intro">
          <h2>Bem-vindo!</h2>
          <p>
            És responsável pelo site: "Where in Porto". Podes adicionar, apagar
            ou editar o que estiver visível no site principal em segundos.
          </p>
          <p>
            No menu podes navegar através de várias categorias e criar ou
            modificar elementos no website transformando-o num guia de
            informação para turistas que visitem a nossa cidade!
          </p>
        </div>
      </div>
      <div id="background-content">
        <h3 id="background-title">Imagem de Fundo</h3>
        <img src={props.state.url} alt="bg" width="200px" />
        <div id="buttons-bg">
          <label for="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Escolher Imagem
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
              Confirmar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

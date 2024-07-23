import "./index.css";
import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

const PostProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [aUnitOfPrice, setaUnitOfPrice] = useState("");
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  const handleUpload = () => {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`file${i + 1}`, files[i]);
    }

    setMsg("Uploading...");
    fetch(`${BASE_URL}/api/create-product`, {
      method: "POST",
      body: fd,
      headers: {
        "Custom-Header": "value",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Bad response");
        }
        setMsg("Upload successful");
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        setMsg("Upload failed");
        console.error(err);
      });
  };

  const postproduct = async () => {
    if (!productName || !description || !aUnitOfPrice) {
      alert("all field are required");
      return;
    }
    try {
      const token = await localStorage.getItem("ACCESS_TOKEN");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", token);

      var raw = JSON.stringify({
        productName,
        image,
        description,
        a_unit_of_price: aUnitOfPrice,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/create-product`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.insertId) {
            navigate("/products");
          } else {
            alert(resultJson?.error);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="container-post-product">
      <Header />
      <div id="title-post-product">
        <h2>Post the information of a new product in the blankets!</h2>
      </div>
      <div id="contain-post-product">
        <div className="ima">Product name(*)</div>
        <input
          id="new-product-name"
          placeholder="Type the name of new product ..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <div id="object-new-product">
          <div className="ima">Image</div>
          <div id="upload1-new-product">
            <input
              id="choose-file-product"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              type="file"
              multiple
            ></input>
            <button id="upload" onClick={handleUpload}>
              Upload
            </button>
            {progress.started && (
              <progress max="100" value={progress.pc}></progress>
            )}
            {msg && <span>{msg}</span>}
          </div>
        </div>
        {/* <input id="image" value={image} onChange={(e) => setImage(e.target.value)} /> */}

        <div className="ima">Description(*)</div>
        <textarea
          id="description-product"
          placeholder="Type the description of the product ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="ima">A unit of price(*)</div>
        <input
          id="price-new-product"
          placeholder="Type the price of the product ..."
          value={aUnitOfPrice}
          onChange={(e) => setaUnitOfPrice(e.target.value)}
        />

        <div id="note-post-new-product">
          <div>Note: You must fill all the (*) parts</div>
        </div>

        <button id="post-new-product-button" onClick={postproduct}>
          Post a new product
        </button>
      </div>
    </div>
  );
};

export default PostProductScreen;

import "./index.css";
import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const PostProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [aUnitOfPrice, setaUnitOfPrice] = useState("");
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc:0 });
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  const handleUpload = () => {
    if(!files){
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i<files.length; i++){
      fd.append(`file${i+1}`, files[i]);
    }

    setMsg("Uploading...");
    fetch('http://httpbin.org/post', {
      method: "POST",
      body: fd,
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Bad response");
      }
      setMsg("Upload successful");
      return res.json();
    })
    .then(data => console.log(data))
    .catch(err => {
      setMsg("Upload failed");
      console.error(err);
    });
  }

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
            headers : myHeaders,
            body : raw,
            redirect : "follow",
        };

        fetch(`${BASE_URL}/api/create-product`, requestOptions)
            .then((response) => response.text())
            .then(async (result) => {
                const resultJson = JSON.parse(result);
                if(resultJson?.insertId) {
                    navigate("/products");
                } else{
                    alert(resultJson?.error);
                }
            })
            .catch((error) => console.log("error",error));
    } catch (error) {
        console.log(error);
    }
  };

  return(
    <div className="container">
      <div className="contain">
      <div className="object">Product name</div>
      <input id="name" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <div className="object">
        Image
        <div className="upload">
            <input onChange={ (e) => {setFiles(e.target.files)} } type="file" multiple></input>
            <button onClick={handleUpload}>Upload</button>
            {/* {progress.started && <progress max="100" value={progress.pc}></progress>} */}
            {msg && <span>{msg}</span>}
          </div>
      </div>
      {/* <input id="image" value={image} onChange={(e) => setImage(e.target.value)} /> */}

      <div className="object">Description</div>
      <input id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="object">A unit of price</div>
      <input id="price" value={aUnitOfPrice} onChange={(e) => setaUnitOfPrice(e.target.value)} />

      <button id="post" onClick={postproduct}>
        <b>POST A NEW PRODUCT</b>
      </button>
      </div>
    </div>
  );
};

export default PostProductScreen;
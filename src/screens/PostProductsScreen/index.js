import "./index.css";
import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const PostProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [aUnitOfPrice, setaUnitOfPrice] = useState("");

  const navigate = useNavigate();

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
      <div>Product name</div>
      <input value={productName} onChange={(e) => setProductName(e.target.value)} />
      <div>Image</div>
      <input value={image} onChange={(e) => setImage(e.target.value)} />

      <div>Description</div>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>A unit of price</div>
      <input value={aUnitOfPrice} onChange={(e) => setaUnitOfPrice(e.target.value)} />

      <button onClick={postproduct}>Post your product</button>
    </div>
  );
};

export default PostProductScreen;
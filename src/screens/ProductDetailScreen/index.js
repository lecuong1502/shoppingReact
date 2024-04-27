import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

const ProductDetailScreen = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/products/${id}`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.id) {
            setProduct(resultJson);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      <div>name: {product?.productName}</div>
      <div>image: {product?.image}</div>
      <div>desc: {product?.description}</div>
      <div>price: {product?.a_unit_of_price}</div>
    </div>
  );
};

export default ProductDetailScreen;

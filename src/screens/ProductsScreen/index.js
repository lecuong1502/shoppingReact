import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/products`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.data) {
            setProducts(resultJson?.data);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {products?.map((item) => (
        <div
          onClick={() => {
            navigate(`/products/${item?.id}`);
          }}
        >
          <div>name: {item?.productName}</div>
          <div>image: {item?.image}</div>
          <div>desc: {item?.description}</div>
          <div>price: {item?.a_unit_of_price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductsScreen;

import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

const OrderList = () => {
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const token = await localStorage.getItem("ACCESS_TOKEN");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/history-order`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.data) {
            setProducts1(resultJson?.data.userData);
            setProducts2(resultJson?.data.productData);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      {products1?.map((item) => (
        <div>
          <div>User name: {item.name}</div>
        </div>
      ))}
      {products2?.map((item) => (
        <div>
          <div>Product Name: {item.productName}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

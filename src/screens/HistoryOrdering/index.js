import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

const HistoryOrdering = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
      
            fetch(`${BASE_URL}/api/history`, requestOptions)
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
    }

    return (
        <div className="history-page">
            <Header />
            {products?.map((item) => (
                <div>
                    <div>ID product: {item?.productID}</div>
                    <div>Amount: {item?.amount}</div>
                    <div>Price: {item?.price}</div>
                </div>
            ))}
        </div>
    );
};

export default HistoryOrdering;
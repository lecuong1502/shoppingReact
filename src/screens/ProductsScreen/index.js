import './index.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const ProductsScreen = () => {

    const [products, setProducts] = useState([]);

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
          <div>
            <div>name: {item?.productName}</div>
            <div>desc: {item?.description}</div>
          </div>
        ))}
      </div>
    );
}

export default ProductsScreen;
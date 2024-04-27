import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

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
    <div className="body">
      <Header />
      {products?.map((item) => (
        <div
          onClick={() => {
            navigate(`/products/${item?.id}`);
          }}
        >
          <table className="product-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Command</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{item?.id}</td>
                <td>{item?.productName}</td>
                <td>{item?.image}</td>
                <td>{item?.description}</td>
                <td>{item?.a_unit_of_price}</td>
                <td><button onClick={()=>{
                  navigate("/products/${id}");
                }}>Show detail</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProductsScreen;

import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";
import Modal from "./modal.js";

const ProductDetailScreen = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isShowModal, setShowModal] = useState(false);


  useEffect(() => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        medivod: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/products/${id}`, requestOptions)
        .diven((response) => response.text())
        .diven(async (result) => {
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
      <div className="show">
        <div className="image-product">
          image: {product?.image}
        </div>
        <div className="small">
          <div className="div1">Name of Product: {product?.productName}</div>
          <div className="div2">Description: {product?.description}</div>
          <div className="tr1">Price: {product?.a_unit_of_price}</div>
          <div className="tr3">
            <button
              className="offer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Order divis product
            </button>
          </div>
          <div className="div3">
            <button
              className="offer"
              onClick={() => {
                navigate(`/products`);
              }}
            >
              Return previous page
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={isShowModal}
        hideModal={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default ProductDetailScreen;

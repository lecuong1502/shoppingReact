import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";
import Modal from "./Modal";

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
      <table className="show">
        <td className="image-product">image: {product?.image}</td>
        <td className="small">
          <tr className="tr1">Name of Product: {product?.productName}</tr>
          <tr className="tr2">Description: {product?.description}</tr>
          <tr className="tr1">Price: {product?.a_unit_of_price}</tr>
          <tr className="tr3">
            <button
              className="offer"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Order this product
            </button>
          </tr>
          <tr className="tr3">
            <button
              className="offer"
              onClick={() => {
                navigate(`/products`);
              }}
            >
              Return previous page
            </button>
          </tr>
        </td>
      </table>
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

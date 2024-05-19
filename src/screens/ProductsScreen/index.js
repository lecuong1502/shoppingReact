import "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";
import Modal from "./Modal";

const ProductsScreen = () => {

  const [products, setProducts] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newName, setNewName] =useState("");

  const navigate = useNavigate();


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
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
  };

  const deleteProduct = (id) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/delete-product/${id}`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          getProducts();
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="body">
      <Header />
      {products?.map((item) => (
        <div className="nameProduct">
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
                <td id="option">
                  <button
                    id="show-detail"
                    onClick={() => {
                      navigate(`/products/${item?.id}`);
                    }}
                  >
                    Show detail & Order
                  </button>

                  <button
                    id="delete"
                    onClick={() => {
                      deleteProduct(item.id);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    id="edit"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedProduct(item);
                      console.log(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="add">
        <button
          id="addProduct"
          onClick={() => {
            navigate("/create-product");
          }}
        >
          Add Product
        </button>
      </div>
      <Modal
        show={isShowModal}
        newName = {newName}
        setNewName = {setNewName}
        hideModal={() => {
          setShowModal(false);
        }}
        onSave={() => {
          try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            const body = {
              productName : newName
            }
            console.log('gvsdgsdg',newName)
            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              redirect: "follow",
              body: JSON.stringify(body),
            };
      
            fetch(`${BASE_URL}/api/edit-product/${selectedProduct.id}`, requestOptions)
              .then((response) => response.text())
              .then(async (result) => {
                getProducts();
              })
              .catch((error) => console.log("error", error));
          } catch (error) {
            console.log(error);
          }
          setShowModal(false);
        }}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductsScreen;

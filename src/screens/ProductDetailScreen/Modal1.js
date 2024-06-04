import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import "./Modal.css";
import Order from "./Order";

export default function Modal(props) {
  const show = props.show;
  const hideModal = props.hideModal;
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isShowOrder, setShowOrder] = useState(false);

  const totalFee = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Content-Type",
        "application/json"
      );

      var raw = JSON.stringify({
        amount : count
      });

      console.log('hkjdhajk',result)
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: raw,
      };

      fetch(`${BASE_URL}/api/order/${id}`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.success) {
            alert("success");
          } else {
            alert(resultJson?.error);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }

  const Plus = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const Minus = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

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
      {show ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h3>Paying Board</h3>
            <div className="modal-framework">
              <div className="tr1">
                <div className="amount">Amount</div>
                <div className="amount">Change</div>
              </div>
              <div>
                <div>
                  <div className="quantity">{count}</div>
                </div>

                <div>
                  <div className="manner">
                    <button
                      className="count"
                      onClick={() => {
                        Plus();
                      }}
                    >
                      Increase
                    </button>
                  </div>
                  <div className="manner">
                    <button
                      className="count"
                      onClick={() => {
                        Minus();
                      }}
                    >
                      Decrease
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="calculate">
              <div>Price of a product: {product?.a_unit_of_price} VND</div>
              <div>
                <b>---------------------------------</b>
              </div>
              <div className="calcu">
                <button
                  onClick={() => {
                    const num1 = parseFloat(product.a_unit_of_price);
                    const num2 = parseFloat(count);
                    setResult(num1 * num2);
                    console.log(result)
                  }}
                >
                  Calculate
                </button>

                <button id="ok" onClick={totalFee}>OK</button>

                <button
                  className="pay"
                  onClick={() => {
                    setCount(0);
                  }}
                >
                  Refresh
                </button>
              </div>
              <div>Total: {result} VND</div>

              <div className="paying">
                <div className="method">
                  <div>Paying method</div>
                  <div>
                    <div className="ordering-product">
                      {!isShowOrder && (
                        <button
                          onClick={() => {
                            setShowOrder(true);
                          }}
                        >
                          Order
                        </button>
                      )}

                      <Order
                        showOrder={isShowOrder}
                        hideOrder={() => {
                          setShowOrder(false);
                        }}
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`close-modal ${isHovered ? "hovered" : ""}`}
            onClick={hideModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            x
          </button>
        </div>
      ) : undefined}
    </div>
  );
}

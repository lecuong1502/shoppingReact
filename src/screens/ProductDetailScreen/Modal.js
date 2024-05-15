import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import "./Modal.css";

export default function Modal(props) {
  const show = props.show;
  const hideModal = props.hideModal;
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const Plus = () => {
    setCount(prevCount => prevCount + 1);
  };

  const Minus = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
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
            <table className="modal-framework">
              <tr className="tr1">
                <th className="amount">Amount</th>
                <th className="amount">Change</th>
              </tr>
              <tr>
                <td>
                  <div className="quantity">{count}</div>
                </td>

                <td>
                  <tr className="manner">
                    <button
                      className="count"
                      onClick={() => {
                        Plus();
                      }}
                    >
                      Increase
                    </button>
                  </tr>
                  <tr className="manner">
                    <button
                      className="count"
                      onClick={() => {
                        Minus();
                      }}
                    >
                      Decrease
                    </button>
                  </tr>
                </td>
              </tr>
            </table>

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
                  }}
                >
                  Calculate
                </button>

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
                <table className="method">
                  <thead>Paying method</thead>
                  <td>
                    <td>
                      <button>
                        Paying after receiving
                      </button>
                    </td>
                    <td>
                      <button>
                        E-wallet
                      </button>
                    </td>
                    <td>
                      <button>
                        Bank account
                      </button>
                    </td>
                  </td>
                </table>
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
        </div>
      ) : undefined}
    </div>
  );
}

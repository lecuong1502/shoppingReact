import React, { useState } from "react";
import "./modal.css";

export default function Modal(props) {
  const show = props.show;
  const hideModal = props.hideModal;
  const selectedProduct = props.selectedProduct;
  const onSave = props.onSave;

  return (
    <div>
      {show ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <input
              placeholder="name"
              defaultValue={selectedProduct.productName}
            ></input>
            <input placeholder="image"></input>
            <input placeholder="description"></input>
            <input placeholder="price"></input>
            <button type="submit" onClick={onSave}>
              Save
            </button>
            <button className="close-modal" onClick={hideModal}>
              Close
            </button>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

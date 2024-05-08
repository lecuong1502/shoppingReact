import React, { useState } from "react";
import "./modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modl')
  } else {
    document.body.classList.remove('active-modl')
  }

  return (
    <div>
      <button onClick={toggleModal} className="btn-modal">
        Open modal
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <input placeholder="New name"></input>
            <input placeholder="New image"></input>
            <input placeholder="New description"></input>
            <input placeholder="New price"></input>
            <button type="submit">Save</button>
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

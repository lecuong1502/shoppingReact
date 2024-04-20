import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Avatar() {
    const [preview, setPreview] = useState(null);
    function onClose() {
      setPreview(null);
    }
    function onCrop(pv) {
      setPreview(pv);
    }
  
    function onBeforeFileLoad(elem) {
      if(elem.target.files[0].size > 71680){
        alert("File is too big");
        elem.target.value = " ";
      }
    }
  
    return(
      <div>
        <Avatar
          width={300}
          height={300}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={null}
        />
        {preview && <img src={preview} alt="Preview"/>}
      </div>
    );
  }
  
export default Avatar;
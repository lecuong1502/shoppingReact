import "./index.css";
import React, { useState, useEffect } from "react";
import background from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const LoginScreen = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!gmail || !password) {
      alert("all field are required");
      return;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        password,
        gmail,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/login`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.token) {
            await localStorage.setItem("ACCESS_TOKEN", resultJson?.token);
            navigate("/products");
          } else {
            alert(resultJson?.error);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="contain">
        <div>
          <b>Gmail</b>
        </div>
        <input id="gmail" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <div>
          <b>Password</b>
        </div>
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create a new account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;

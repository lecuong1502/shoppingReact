import "./index.css";
import React, { useState } from "react";
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
      <div>gmail</div>
      <input value={gmail} onChange={(e) => setGmail(e.target.value)} />
      <div>password</div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        go to sign up
      </button>
    </div>
  );
};

export default LoginScreen;

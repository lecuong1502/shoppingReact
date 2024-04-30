import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const SignUpScreen = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    if (
      !gmail ||
      !password ||
      !passwordConfirm ||
      !name ||
      !address ||
      !phone
    ) {
      alert("all field are required");
      return;
    }
    if (password !== passwordConfirm) {
      alert("password not match");
      return;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name,
        password,
        gmail,
        phoneNum: phone,
        address,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/signup`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const resultJson = JSON.parse(result);
          if (resultJson?.success) {
            alert("sign up success");
            navigate("/login");
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
        <div className="obj">Gmail</div>
        <input className="info" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <div className="obj">Password</div>
        <input className="info" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="obj">Password Confirm</div>
        <input className="info" type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <div className="obj">Name</div>
        <input className="info" value={name} onChange={(e) => setName(e.target.value)} />

        <div className="obj">Address</div>
        <input className="info" value={address} onChange={(e) => setAddress(e.target.value)} />

        <div className="obj">Phone Number</div>
        <input className="info" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button id="signup" onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpScreen;

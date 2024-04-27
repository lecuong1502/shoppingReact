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
      <div>Gmail</div>
      <input value={gmail} onChange={(e) => setGmail(e.target.value)} />
      <div>Password</div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <div>Password Confirm</div>
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <div>Name</div>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <div>Address</div>
      <input value={address} onChange={(e) => setAddress(e.target.value)} />

      <div>Phone number</div>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button onClick={signup}>Signup</button>
    </div>
  );
};

export default SignUpScreen;

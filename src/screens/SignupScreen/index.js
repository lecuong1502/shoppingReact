import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";

const SignUpScreen = () => {
  //   const [gmail, setGmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [passwordConfirm, setPasswordConfirm] = useState("");
  //   const [name, setName] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [phone, setPhone] = useState("");
  const [gmail, setGmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("123");
  const [passwordConfirm, setPasswordConfirm] = useState("123");
  const [name, setName] = useState("thang");
  const [address, setAddress] = useState("HN");
  const [phone, setPhone] = useState("0928282722");

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
      <div>gmail</div>
      <input value={gmail} onChange={(e) => setGmail(e.target.value)} />
      <div>password</div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <div>passwordConfirm</div>
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <div>name</div>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <div>address</div>
      <input value={address} onChange={(e) => setAddress(e.target.value)} />

      <div>phone</div>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button onClick={signup}>Signup</button>
    </div>
  );
};

export default SignUpScreen;

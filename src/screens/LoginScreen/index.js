import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <div>gmail</div>
      <input value={gmail} onChange={(e) => setGmail(e.target.value)} />
      <div>password</div>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
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

import React, { useState, useEffect } from "react";
import "./Header.css";
import avt from "../assets/avt.jpg";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import logo from "../assets/ES-SHOP.png";
import "./Avatar";
import { Avatar } from "@mui/material";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async () => {
    const token = await localStorage.getItem("ACCESS_TOKEN");

    //log out by removeItem();
    if (token) {
      setIsLoggedIn(true);
      return;
    }
    setIsLoggedIn(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} width={59} height={59}></img>
      </div>
      <div className="search">
        <TextField id="outline" variant="outlined" fullWidth label="Search in here..." />
      </div>
      <div className="profile">
        {isLoggedIn ? (
            <button id="avatar">
              <img src={avt} width={50} height={50} onClick={() => {
                navigate("/login");
              }}></img>
            </button>
        ) : (
            <div onClick={() =>{
              navigate("/login");
            }}>Log In</div>
        )}
      </div>
    </div>
  );
}

export default Header;

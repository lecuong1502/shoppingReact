import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/ES-SHOP.png";
import TextField from "@mui/material/TextField";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    const token = await localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoggedIn(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} width={100} height={100}></img>
      </div>
      <div className="search">
        <TextField variant="outlined" fullWidth label="Search" />
      </div>
      <div className="profile">
        {isLoggedIn ? (
            <div>logged in</div>
        ) : (
            <div>not logged in</div>
        )}
      </div>
    </div>
  );
}

export default Header;

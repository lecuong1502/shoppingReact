import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/ES-SHOP.png";
import TextField from "@mui/material/TextField";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <img src={logo} width={50} height={50}></img>
      </div>
      <div className="search">
        <TextField id="outline" variant="outlined" fullWidth label="Search in here..." />
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

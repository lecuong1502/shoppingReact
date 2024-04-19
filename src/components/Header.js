import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/ES-SHOP.png";
import TextField from '@mui/material/TextField';
import 

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} width={100} height={100}></img>
            </div>
            <div className="search">
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <div className="profile">
                <div className="login">
                    <button id="login" ></button>
                </div>
            </div>
        </div>
    );
}

async function CheckLogin() {
    const token = await localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        return true;
    }
    return false;
}

export default Header;
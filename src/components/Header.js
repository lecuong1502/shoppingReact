import React, { useState, useEffect } from "react";
import "./Header.css";
import avt from "../assets/avt.jpg";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ES-SHOP.png";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

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

  const logout = async () => {
    await localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  }

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} width={59} height={59}></img>
      </div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results}/>
      </div>
      <div className="profile">
        {isLoggedIn ? (
            <div id="avatar">
              <img src={avt} width={50} height={50} />
              <button onClick={()=>{
                logout();
              }}>LOG OUT</button>
            </div>
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

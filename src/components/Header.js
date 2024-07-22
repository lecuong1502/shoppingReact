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
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = async () => {
    await localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} width={59} height={59}></img>
      </div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
      <div id="profile-user">
        {isLoggedIn ? (
          <div id="avatar">
            <div>
              <img id="general-avt" src={avt} width={62} height={62} />
            </div>

            <div id="extra-button">
              <div>
                <button
                  id="logout-page"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </button>
              </div>

              <div>
                <button
                  id="history-page"
                  onClick={() => {
                    navigate("/history");
                  }}
                >
                  History
                </button>
              </div>
              <div id="history-order-page">
                <button
                  id="history-order-page"
                  onClick={() => {
                    navigate("/history-order");
                  }}
                >
                  History order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            id="login-page"
            onClick={() => {
              navigate("/login");
            }}
          >
            <b>Login</b>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

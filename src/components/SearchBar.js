import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { BASE_URL } from "../environment";

export const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch(`${BASE_URL}/api/search-product?productName=${value}`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search ..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
    </div>
  );
};

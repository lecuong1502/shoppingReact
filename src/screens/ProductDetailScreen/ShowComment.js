import "./ShowComment.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Header from "../../components/Header";

export default function ShowComment (props) {
  const show = props.show;

  return (
    <div>
        <div>
          {props.userData?.map((item) => (
            <div>Name: {item.name}</div>
          ))}
          {props.comments?.map((item) => (
            <div>Comment: {item.comment}</div>
          ))}
        </div>
    </div>
  );
};

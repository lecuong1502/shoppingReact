import "./Comment.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import ShowComment from "./ShowComment";

export default function Comment() {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const post = async () => {
    try {
      const token = await localStorage.getItem("ACCESS_TOKEN");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", token);

      var raw = JSON.stringify({
        comment,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${BASE_URL}/api/products/${id}`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const resultJson = JSON.parse(result);
          console.log(result);
          if (resultJson?.success) {
            alert("Post your comment successfully");
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
    <div>
      <div id="comment">
        <div className="type">Your comment</div>
        <input
          id="comment-input"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button id="postcomment" onClick={post}>
          Post
        </button>
      </div>
      <ShowComment/>
    </div>
  );
}

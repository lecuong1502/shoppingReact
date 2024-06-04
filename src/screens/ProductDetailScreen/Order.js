import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../environment";
import "./Order.css";

export default function Order(props) {
    const showOrder = props.showOrder;
    const hideOrder = props.hideOrder;

    return (
        <div>
            {showOrder ? (
                <div>
                    <input id="addr" placeholder="Fill your address"></input>
                </div>
            ) : undefined}
        </div>
    );
}
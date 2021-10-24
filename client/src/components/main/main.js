import React from "react";
import "./main.css";

export const Main = () => {
  return (
    <div className="main">
      <div className="top">
        <h2 className="welcome-text">Welcome Disu</h2>
        <div className="image-and-name">
          <img
            className="profile-image"
            alt="profile"
            src={
              "http://res.cloudinary.com/da8lhhapk/image/upload/v1635090832/ztxnl7v7kepmefywve6g.png"
            }
          />
          <p className="display">@KayKay</p>
        </div>
      </div>
    </div>
  );
};

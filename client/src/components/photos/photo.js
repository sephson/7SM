import React from "react";
import "./photos.css";
import one from "../../pictures/1.jpg";
import two from "../../pictures/2.jpg";
import three from "../../pictures/3.jpg";
import four from "../../pictures/4.jpg";
import five from "../../pictures/5.jpg";
import six from "../../pictures/6.jpg";
import seven from "../../pictures/7.jpg";
import eight from "../../pictures/8.jpg";

export const Photo = () => {
  const pics = [
    { postedBy: "Disu", src: one },
    { postedBy: "Toyin", src: two },
    { postedBy: "Mic", src: three },
    { postedBy: "Anu", src: four },
    { postedBy: "Disu", src: five },
    { postedBy: "Toyin", src: six },
    { postedBy: "Mic", src: seven },
    { postedBy: "Anu", src: eight },
  ];
  return (
    <div className="photos">
      <ul className="gallery-container">
        {pics.map((pic) => {
          return (
            <li className="image-container">
              <img className="gallery-image" src={pic.src} alt="gallery" />
              <p className="postedby">{pic.postedBy}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

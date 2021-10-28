import React from "react";
import { Photo } from "../../components/photos/photo";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./Gallery.css";

export const Gallery = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <Photo />
    </div>
  );
};

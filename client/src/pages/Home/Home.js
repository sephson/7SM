import React from "react";
import { Main } from "../../components/main/main";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Main />
      <Rightbar />
    </div>
  );
};

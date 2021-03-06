import React from "react";
import { Main } from "../../components/main/main";
import { Sidebar } from "../../components/sidebar/sidebar";
import "./Home.css";

export const Home = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <Main />
    </div>
  );
};

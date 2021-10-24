import React from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import "./sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">FamHouse</h2>
      <h4 className="family-name">Disu</h4>
      <p className="sidebar-menu">
        <PersonIcon className="ui-icon" /> Profile
      </p>
      <p className="sidebar-menu">
        <PhotoLibraryIcon className="ui-icon" /> Gallery
      </p>
      <p className="sidebar-menu">
        <PersonSearchIcon className="ui-icon" /> Search
      </p>
      <p className="sidebar-menu">
        <FamilyRestroomIcon className="ui-icon" /> Room
      </p>
      <p className="sidebar-menu">
        <WorkspacesIcon className="ui-icon" /> Audio Space
      </p>
      <p className="sidebar-menu ">
        <SettingsIcon className="ui-icon" /> Settings
      </p>
    </div>
  );
};

//color pallete
//ffffff
// f5f3f4
// d3d3d3
// b1a7a6
// e5383b
// ba181b
// a4161a
// 660708
// 161a1d
// 0b090a

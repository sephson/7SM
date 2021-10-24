const express = require("express");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

const cloudinaryUpload = async (file) => {
  try {
    const up = await cloudinary.uploader.upload(file);
    return up;
  } catch (error) {
    console.log(error);
  }
};
module.exports = cloudinaryUpload;

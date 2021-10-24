const express = require("express");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const cloudinaryDelete = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = { cloudinaryUpload, cloudinaryDelete };

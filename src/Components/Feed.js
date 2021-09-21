import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./Header";
import UploadFile from "./UploadFile";
import Posts from "./Posts";
import "./Feed.css";

function Feed() {
  return (
    <>
      <Header />
      <UploadFile />
    </>
  );
}

export default Feed;

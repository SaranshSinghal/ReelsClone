import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ClassNames } from "@emotion/react";

function Posts({ userData = null }) {
  return (
    <>
      <div className="place"></div>
      {posts === null ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Posts;

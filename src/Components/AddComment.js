import React, { useState } from "react";
import { database } from "../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddComment({ userData = null, postData = null }) {
  const [text, setText] = useState("");
  const manageText = (e) => setText(e.target.value);

  const handleOnEnter = () => {
    let obj = {
      text: text,
      uName: userData.username,
      uUrl: userData.profileUrl,
    };

    database.comments
      .add(obj)
      .then((docRef) =>
        database.posts
          .doc(postData.postId)
          .update({ comments: [...postData.comments, docRef.id] }),
      )
      .catch((e) => console.log(e + " "));

    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        margin: 0,
        marginLeft: "4%",
        marginRight: "2%",
        paddingBottom: "2%",
      }}
    >
      <TextField
        value={text}
        fullWidth={true}
        label="Add a comment"
        onChange={manageText}
      />
      <Button
        onClick={handleOnEnter}
        disabled={text === "" ? true : false}
        style={{
          marginRight: "1%",
          marginTop: "4%",
        }}
        color="primary"
      >
        Post
      </Button>
    </div>
  );
}

export default AddComment;

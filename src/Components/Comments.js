import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

function Comments(props) {
  const [comments, setComments] = useState(null);

  useEffect(async () => {
    let arr = [];

    for (let i = 0; i < props.postData.comments.length; i++) {
      let cid = props.postData.comments[i];
      let data = await database.comments.doc(cid).get();
      arr.push(data.data());
    }

    setComments(arr);
  }, [props.postData]);

  return (
    <>
      {comments === null ? (
        <CircularProgress />
      ) : (
        comments.map((comment, index) => (
          <div
            key={index}
            style={{
              maxWidth: "100%",
              display: "flex",
              margin: "3%",
            }}
          >
            <Avatar src={comment.uUrl} style={{ marginRight: "2%", marginTop: "2%" }} />
            <p>
              <span style={{ fontWeight: "bold", display: "inline-block" }}>
                {comment.uName}
              </span>
              &nbsp;&nbsp;{comment.text}
            </p>
          </div>
        ))
      )}
    </>
  );
}

export default Comments;

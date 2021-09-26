import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { database } from "../firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const useStyles = makeStyles({
  like: { color: "#e74c3c", cursor: "pointer" },
  unlike: { color: "#000", cursor: "pointer" },
});

function Likes({ userData = null, postData = null }) {
  const [like, setLike] = useState(null);
  const classes = useStyles();

  const handleLike = async () => {
    if (like === true) {
      let uarr = postData.likes.filter((el) => {
        return el !== userData.userId;
      });

      await database.posts.doc(postData.postId).update({
        likes: uarr,
      });
    } else {
      let uarr = [...postData.likes, userData.userId];

      await database.posts.doc(postData.postId).update({
        likes: uarr,
      });
    }
  };

  useEffect(() => {
    let check = postData.likes.includes(userData?.userId) ? true : false;
    setLike(check);
  }, [postData]);

  return (
    <>
      {like !== null ? (
        <>
          {like === false ? (
            <FavoriteBorderIcon
              className={`${classes.unlike} icon-styling`}
              onClick={handleLike}
            />
          ) : (
            <FavoriteIcon
              className={`${classes.like} icon-styling`}
              onClick={handleLike}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Likes;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video";
import Avatar from "@mui/material/Avatar";
import Likes from "./Likes";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Comments from "./Comments";
import Typography from "@mui/material/Typography";
import AddComment from "./AddComment";
import "./Posts.css";

const useStyles = makeStyles({
  root: { width: "100%", padding: "0px" },
  loader: { position: "absolute", left: "50%", top: "50%" },
  typo: { marginLeft: "2%" },
  vac: { marginLeft: "3.5%", color: "#8e8e8e", cursor: "pointer" },
  dp: { marginLeft: "2%" },
  cc: { height: "50vh", overflowY: "auto" },
  seeComments: { height: "54vh", overflowY: "auto" },
  ci: { color: "#fff", left: "9%", cursor: "pointer" },
  mn: { color: "#fff" },
  tmn: { color: "#fff" },
});

function Posts({ userData = null }) {
  const classes = useStyles();
  const [posts, setPosts] = useState(null);
  const [openId, setOpenId] = useState(null);
  const handleClickOpen = (id) => setOpenId(id);
  const handleClose = () => setOpenId(null);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((element) => {
        let el = element.target.childNodes[0];
        el.play().then(() => {
          //if this video is not in viewport then pause it
          if (!el.paused && !element.isIntersecting) el.pause();
        });
      });
    },
    { threshold: 0.85 },
  );

  useEffect(() => {
    let parr = [];

    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];

        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });

        setPosts(parr);
      });

    return unsub;
  }, []);

  useEffect(() => {
    document.querySelectorAll(".videos").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posts]);

  return (
    <>
      <div className="place" />
      {posts === null ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <div className="video-container" id="video-container">
          {posts.map((post) => (
            <React.Fragment key={post.pId}>
              <div className="videos">
                <Video source={post.pUrl} id={post.pId} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar src={post.uProfile} />
                  <h4>{post.uName}</h4>
                </div>
                <Likes userData={userData} postData={post} />
                <ChatBubbleIcon
                  onClick={() => handleClickOpen(post.pId)}
                  className={`${classes.ci} icon-styling`}
                />
                <Dialog
                  maxWidth="md"
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={openId === post.pId}
                >
                  <DialogContent>
                    <div className="dcontainer">
                      <div className="video-part">
                        <video
                          autoPlay={true}
                          className="video-styles"
                          controls
                          id={post.id}
                          muted="muted"
                          type="video/mp4"
                        >
                          <source src={post.pUrl} type="video/webm" />
                        </video>
                      </div>
                      <div className="info-part">
                        <Card>
                          <CardHeader
                            avatar={
                              <Avatar
                                src={post?.uProfile}
                                aria-label="recipe"
                                className={classes.avatar}
                              />
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={post?.uName}
                          />
                          <hr
                            style={{
                              border: "none",
                              height: "1px",
                              color: "#dfe6e9",
                              backgroundColor: "#dfe6e9",
                            }}
                          />
                          <CardContent className={classes.seeComments}>
                            <Comments userData={userData} postData={post} />
                          </CardContent>
                        </Card>
                        <div className="extra">
                          <div className="likes">
                            <Typography
                              className={classes.typo}
                              variant="body2"
                            >
                              Liked By{" "}
                              {post.likes.length === 0 ? "nobody" : "others"}
                            </Typography>
                          </div>
                          <AddComment userData={userData} postData={post} />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="place" />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;

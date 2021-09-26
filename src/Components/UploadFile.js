import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { storage, database } from "../firebase";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LinearProgress from "@mui/material/LinearProgress";

const Input = styled("input")({ display: "none" });

function UploadFile(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const types = ["video/mp4", "video/webm", "video/ogg"];

  const onChange = (e) => {
    const file = e?.target?.files[0];

    if (!file) {
      setError("Please select a file");
      setTimeout(() => setError(null), 2000);
      return;
    }

    if (types.indexOf(file.type) === -1) {
      setError("Please select a supported(video) file");
      setTimeout(() => setError(null), 2000);
      return;
    }

    if (file.size / (1024 * 1024) > 100) {
      setError("Selected file is too big!");
      setTimeout(() => setError(null), 2000);
      return;
    }

    const id = uuidv4();

    const uploadTask = storage
      .ref(`/posts/${props.userData.userId}/${file.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setError(error);
        setTimeout(() => setError(null), 2000);
        setLoading(false);
      },
      async () => {
        setLoading(true);

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          let obj = {
            comments: [],
            likes: [],
            pId: id,
            pUrl: url,
            uName: props?.userData?.username,
            uProfile: props?.userData?.profileUrl,
            userId: props?.userData?.userId,
            createdAt: database.getCurrentTimeStamp(),
          };

          database.posts
            .add(obj)
            .then(async (docRef) => {
              console.log(docRef);

              let res = await database.users
                .doc(props.userData.userId)
                .update({ postIds: [...props.userData.postIds, docRef.id] });

              console.log(res);
            })
            .then(() => {
              setLoading(false);
            })
            .catch((err) => {
              setError(err);
              setTimeout(() => setError(null), 2000);
              setLoading(false);
            });
        });
      },
    );
  };

  return (
    <>
      {error != null ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <label htmlFor="contained-button-file">
            <Input
              accept="video/*"
              type="file"
              onChange={onChange}
              id="contained-button-file"
              multiple
            />
            <Button
              variant="contained"
              component="span"
              disabled={loading}
              size="medium"
              color="primary"
            >
              <PhotoCamera />
              &nbsp;&nbsp;Upload
            </Button>
          </label>
          {loading ? (
            <LinearProgress color="secondary" style={{ marginTop: "6%" }} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default UploadFile;

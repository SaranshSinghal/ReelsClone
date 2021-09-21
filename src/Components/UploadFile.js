import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});

function UploadFile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const types = ["video/mp4", "video/webm", "video/ogg"];

  

  return (
    <>
      {error != null ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              onChange={onChange}
              type="file"
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
